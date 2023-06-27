import React, { useState } from "react";
/* import bootstrap */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { axiosPostFunction, controllerUrls } from "../../../useFullItems/axios";
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
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [localAddress, setLocalAddress] = useState("");
  const [idProofPhoto, setIdProofPhoto] = useState<File>();
  const [saving, setSaving] = useState(false);

  // functions

  const saveManager = () => {
    if (!firstName) return alert("Please enter first name");
    if (!lastName) return alert("Please enter last name");

    setSaving(true);

    axiosPostFunction({
      parentUrl: controllerUrls.manager,
      // loader: true,
      data: {
        firstName,
        middleName,
        lastName,
        email,
      },
      thenFunction: () => {
        setSaving(false);
      },
    });
  };

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
        <Button
          variant="success"
          type="submit"
          disabled={saving}
          onClick={saveManager}
          form="workerForm"
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </Modal.Header>
      <Modal.Body className="p-3">
        <Form>
          <Form.FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
            />
          </Form.FloatingLabel>
          <Form.FloatingLabel label="Enter First Name" className="mb-3">
            <Form.Control
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              placeholder="Enter First Name"
            />
          </Form.FloatingLabel>
          <Form.FloatingLabel label="Enter Middle Name" className="mb-3">
            <Form.Control
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              type="text"
              placeholder="Enter Middle Name"
            />
          </Form.FloatingLabel>
          <Form.FloatingLabel label="Enter Last Name" className="mb-3">
            <Form.Control
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              placeholder="Enter Last Name"
            />
          </Form.FloatingLabel>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
