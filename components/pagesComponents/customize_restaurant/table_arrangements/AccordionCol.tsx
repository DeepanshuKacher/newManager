import { useState, useEffect } from "react";
import Head from "next/head";
/* bootstrap */
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import type { Table } from "../../../../interfaces";

interface Props {
  tableInfo: Table;
  setDataToModal: (para: Table) => void;
  setDataToDelete: (para: Table) => void;
  toggleOpenClose: boolean;
}

export const AccordionCol = (props: Props) => {
  const { tableInfo, setDataToModal, setDataToDelete, toggleOpenClose } = props;
  const [tableNumbers, setTableNumbers] = useState<number[]>([]);

  useEffect(() => {
    (function () {
      const temp: number[] = [];

      for (let i = tableInfo.startNumber; i <= tableInfo.endNumber; i++) {
        temp.push(i);
      }
      setTableNumbers(temp);
    })();
  }, []);

  return (
    <Col>
      <Accordion defaultActiveKey={toggleOpenClose ? "0" : ""}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="d-flex justify-content-evenly">
            <span className="me-2">{tableInfo.name}</span>
            {/* if tables */}{" "}
            <Button
              as="span"
              variant="secondary"
              className="me-2 p-0 px-2"
              onClick={() => setDataToModal(tableInfo)}
            >
              Edit
            </Button>
            {/* if no tables */}
            {/* <Button as="span" variant="success" className="me-2 p-0 px-2">
            Add
          </Button> */}
            <Button
              as="span"
              variant="danger"
              className="me-2 p-0 px-2"
              onClick={() => setDataToDelete(tableInfo)}
            >
              Delete
            </Button>
          </Accordion.Header>
          <Accordion.Body>
            <Container fluid>
              <Row xs={4} sm={6} md={4} lg={6} xl={4} xxl={6} className="gx-3">
                {tableNumbers.map((tNumber, index) => {
                  return (
                    <Col key={index}>
                      <p className="p-3 border bg-light d-flex justify-content-center">
                        <span>
                          {tableInfo.prefix}
                          {tNumber}
                          {tableInfo.suffix}
                        </span>
                      </p>
                    </Col>
                  );
                })}
                {/* <Col>
                  <Button className="p-3">(+)</Button>
                </Col> */}
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  );
};
