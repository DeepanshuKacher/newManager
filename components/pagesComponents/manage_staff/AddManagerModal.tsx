import React, { useState } from "react";
/* import bootstrap */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { axiosPostFunction } from "../../../useFullItems/axios";
import { useRouter } from "next/router";
import { loadRestaurantDetail } from "../../../useFullItems/functions";

interface Props {
  handleClose: () => void;
}

export const AddManager = (props: Props) => {
  const { handleClose } = props;
  const router = useRouter();
  const [passPortPhoto, setPassportPhoto] = useState<File>();
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");

  const [localAddress, setLocalAddress] = useState("");
  const [idProofPhoto, setIdProofPhoto] = useState<File>();

  return (
    <Modal
      scrollable
      centered
      show={true}
      onHide={() => alert("Modal Closed")}
      backdrop="static"
    >
      <Modal.Header>
        <Button variant="danger" onClick={handleClose}>
          Delete
        </Button>
        <h3></h3>
        <Button variant="success" type="submit" form="workerForm">
          Save
        </Button>
      </Modal.Header>
      <Modal.Body className="p-3">
        <Form>
          <Form.FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.FloatingLabel>
          <Form.FloatingLabel label="Enter Name" className="mb-3">
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.FloatingLabel>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
