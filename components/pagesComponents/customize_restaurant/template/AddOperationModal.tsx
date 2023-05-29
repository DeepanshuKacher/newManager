import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useFormState } from "../../../../useFullItems/functions";
import { axiosPostFunction } from "../../../../useFullItems/axios";

interface Props {
  handleClose: () => void;
}

export const AddOperationModal = (props: Props) => {
  const { handleClose } = props;
  const [label, setLabel] = useFormState();
  const [gainLoss, setGainLoss] = useState("");
  const [number, setNumber] = useState<number>();
  const [operation, setOperation] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const submit = () => {
    setSubmitLoading(true);
    axiosPostFunction({
      parentUrl: "templates",
      data: {
        operations: {
          label,
          number,
          operation,
          gainLoss,
        },
      },
      thenFunction: () => {
        handleClose();
        setSubmitLoading(false);
      },
    });
    setSubmitLoading(false);
  };

  return (
    <Modal
      // style={{ zIndex: 10 }}
      show={true}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      {/* <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>Label</InputGroup.Text>
          <Form.Control placeholder="Add Operation Label" onChange={setLabel} />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Check
            inline
            id="gain"
            label="Gain"
            type="radio"
            name="gainLoss"
            onClick={() => setGainLoss("gain")}
          />
          <Form.Check
            inline
            id="loss"
            label="Loss"
            type="radio"
            name="gainLoss"
            onClick={() => setGainLoss("loss")}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Number</InputGroup.Text>
          <Form.Control
            placeholder="Number"
            type="number"
            onChange={(e) => setNumber(parseFloat(e.target.value))}
          />
        </InputGroup>

        <InputGroup>
          <Form.Check
            inline
            id="plusOperation"
            label="+"
            type="radio"
            name="operation"
            onClick={() => setOperation("Plus")}
          />
          <Form.Check
            inline
            id="minusOperation"
            label="-"
            type="radio"
            name="operation"
            onClick={() => setOperation("Minus")}
          />
          <Form.Check
            inline
            id="divideOperation"
            label="%"
            type="radio"
            name="operation"
            onClick={() => setOperation("Percentage")}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={submit} disabled={submitLoading}>
          {submitLoading ? "Loading" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
