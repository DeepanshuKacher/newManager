import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  axiosPatchFunction,
  axiosPostFunction,
} from "../../../../useFullItems/axios";
import { Table } from "../../../../interfaces";
import { useAppSelector } from "../../../../useFullItems/redux";

interface Props {
  show: boolean;
  setShow: () => void;
  valuesForEdting?: Table;
}

export const TableAddModal = (props: Props) => {
  const { setShow, show, valuesForEdting } = props;

  const [sectionName, setSectionName] = useState(valuesForEdting?.name || "");
  const [prefix, setPrefix] = useState(valuesForEdting?.prefix || "");
  const [suffix, setSuffix] = useState(valuesForEdting?.suffix || "");
  const [startingNumber, setStartingNumber] = useState(
    valuesForEdting?.startNumber?.toString() || ""
  );
  const [endingNumber, setEndingNumber] = useState(
    valuesForEdting?.endNumber?.toString() || ""
  );

  const upsertSection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valuesForEdting?.id) {
      axiosPatchFunction({
        parentUrl: "tables",
        childUrl: valuesForEdting.id,
        data: {
          name: sectionName,
          prefix,
          suffix,
          startNumber: parseInt(startingNumber!),
          endNumber: parseInt(endingNumber!),
        },
      }).then(() => setShow());
    } else
      axiosPostFunction({
        parentUrl: "tables",
        data: {
          name: sectionName,
          prefix,
          suffix,
          startNumber: parseInt(startingNumber!),
          endNumber: parseInt(endingNumber!),
        },
      }).then(() => setShow());
  };

  return (
    <>
      <Modal show={show} backdrop="static" onHide={setShow}>
        <Modal.Header closeButton>
          <Modal.Title>
            {valuesForEdting?.name
              ? `Edit ${valuesForEdting.name}`
              : "Add Table"}{" "}
            Section
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={upsertSection}>
            <Form.FloatingLabel label="Enter Section Name" className="mb-3">
              <Form.Control
                required
                type="text"
                placeholder="Enter Section Name"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
              />
            </Form.FloatingLabel>
            <Form.FloatingLabel label="Any Prefix" className="mb-3">
              <Form.Control
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="Any Prefix"
                maxLength={1}
              />
            </Form.FloatingLabel>
            <Form.FloatingLabel label="Any Suffix" className="mb-3">
              <Form.Control
                type="text"
                value={suffix}
                maxLength={1}
                onChange={(e) => setSuffix(e.target.value)}
                placeholder="Any Suffix"
              />
            </Form.FloatingLabel>
            <Form.FloatingLabel label="Starting Table Number" className="mb-3">
              <Form.Control
                type="number"
                required
                placeholder="Starting Table Number"
                value={startingNumber}
                min={0}
                onChange={(e) => setStartingNumber(e.target.value)}
              />
            </Form.FloatingLabel>
            <Form.FloatingLabel label="Last Table Number" className="mb-3">
              <Form.Control
                type="number"
                required
                placeholder="Last Table Number"
                value={endingNumber}
                min={startingNumber}
                onChange={(e) => setEndingNumber(e.target.value)}
              />
            </Form.FloatingLabel>
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={setShow}>
                Close
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};
