import React, { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import FormCheck from "react-bootstrap/FormCheck";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Switch from "react-bootstrap/Switch";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import { WaiterType } from "../../../interfaces";

interface Props {
  employeeDetail: WaiterType;
  setWorkerToDelete: (workerDetial: WaiterType) => void;
}

const EmployeeCard = (props: Props) => {
  const { employeeDetail, setWorkerToDelete } = props;
  return (
    <Col xs={6} sm={4} md={3} xl={2}>
      <Card className={`${false && "bg-secondary"}`}>
        <Card.Header>
          <FormCheck
            type="switch"
            defaultChecked={employeeDetail.verified && employeeDetail.available}
            // checked={employeeDetail.verified && employeeDetail.available} in production
            id="custom-switch"
            label="Available"
          />
        </Card.Header>
        <Card.Img
          variant="top"
          src={employeeDetail.passportPhoto || "/images/default_food.jpg"}
          height={200}
          style={{ objectFit: "contain" }}
        />
        <Card.Title className="text-center mt-1">
          {employeeDetail.name}
        </Card.Title>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item title="Mobile Number">
              {employeeDetail.MobileNumber || "Nil"}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col className="d-flex justify-content-around">
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  var a = window.open(undefined, "_blank");
                  if (!a) return;
                  a.document.write("<html>");
                  a.document.write("<body>");
                  a.document.write("<div><div>hi</div><div>hello</div></div>");
                  a.document.write("</body>");
                  a.document.write("</html>");

                  a.document.close();
                  a.print();
                }}
              >
                View
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => setWorkerToDelete(employeeDetail)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export { EmployeeCard };
