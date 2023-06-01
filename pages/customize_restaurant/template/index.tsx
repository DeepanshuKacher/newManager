import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormCheck from "react-bootstrap/FormCheck";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  axiosGetFunction,
  axiosPostFunction,
} from "../../../useFullItems/axios";
import { AddOperationModal } from "../../../components/pagesComponents/customize_restaurant/template/AddOperationModal";
import { TemplateToPrint } from "../../../components/pagesComponents/customize_restaurant/template/TemplateToPrint";

enum OperationType {
  Plus = "Plus",
  Minus = "Minus",
  Multiply = "Multiply",
  Divide = "Divide",
  Percentage = "Percentage",
}

enum GainLoss {
  gain = "gain",
  loss = "loss",
}

type Operations = {
  label: string;
  number: number;
  operation: OperationType;
  gainLoss: GainLoss;
};

const Template = () => {
  const [upperMarkDown, setUpperMarkDown] = useState("");
  const [showAddOperationModal, setShowAddOperationModal] = useState(false);
  const [operationsArray, setOperationArray] = useState<Operations[]>([]);
  // const [lowerMarkDown, setLowerMarkDown] = useState(""); don't delete it
  const ref = useRef();

  useEffect(() => {
    axiosGetFunction({
      parentUrl: "templates",
      thenFunction: (e: {
        operations: Operations[];
        upperSectionText: string;
      }) => {
        const upperSectionValue = e?.upperSectionText || "";
        setUpperMarkDown(upperSectionValue);
        setOperationArray(e?.operations);
      },
    });
  }, []);

  const submit = () => {
    axiosPostFunction({
      parentUrl: "templates",
      loader: true,
      data: {
        upperSectionText: upperMarkDown,
      },
    });
  };

  return (
    <>
      {showAddOperationModal && (
        <AddOperationModal
          handleClose={() => setShowAddOperationModal(false)}
        />
      )}
      <Container fluid>
        <Row className="mb-5 ms-3">
          <Col>
            <FormCheck
              inline
              label="Bill"
              type="radio"
              id="billTemplate"
              name="selectTemplate"
              defaultChecked={true}
            />
            <FormCheck
              inline
              label="KOT"
              type="radio"
              id="kotTemplate"
              name="selectTemplate"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TemplateToPrint
              ref={ref}
              upperMarkDown={upperMarkDown}
              operationsArray={operationsArray}
              prefix="A"
              suffix="S"
              tableNumber={10}
            />
          </Col>
          <Col>
            <Row className="mb-3">
              <Col>
                <InputGroup>
                  <InputGroup.Text>Upper Section</InputGroup.Text>
                  <FormControl
                    as="textarea"
                    aria-label="upper section text"
                    onChange={(e) => setUpperMarkDown(e.target.value)}
                    value={upperMarkDown}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>Gain/Loss</th>
                      <th>Number</th>
                      <th>Operation</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CGST</td>
                      <td>Gain</td>
                      <td>2.5</td>
                      <td>%</td>
                      <td>
                        <img src="/icons/delete.svg" style={{ width: 24 }} />
                      </td>
                    </tr>
                    <tr>
                      <td>CGST 23AYZPS8039E2ZR</td>
                      <td>Gain</td>
                      <td>2.5</td>
                      <td>%</td>
                      <td>
                        <img src="/icons/delete.svg" style={{ width: 24 }} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button onClick={() => setShowAddOperationModal(true)}>
                  Add Operation
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="success" onClick={submit}>
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Template;
