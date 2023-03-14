import React, { useRef, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Table } from "../../../../interfaces";
import { axiosDeleteFunction } from "../../../../useFullItems/axios";

interface Props {
  show: boolean;
  handleClose: () => void;
  deleteTableDetail: Table;
}

export function DeleteModal(props: Props) {
  const { handleClose, show, deleteTableDetail } = props;
  const [inputText, setInputText] = useState("");

  const deleteFunction = () => {
    if (inputText !== deleteTableDetail.name) {
      alert("Please Enter section name");
      setInputText("");
      return;
    }

    axiosDeleteFunction({
      parentUrl: "tables",
      childUrl: deleteTableDetail.id,
    }).then(() => handleClose());
  };

  return (
    <Modal show={show} backdrop="static" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure to delete {deleteTableDetail.name} section
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please enter {deleteTableDetail.name} to proceed
        <FormControl
          value={inputText}
          className="mt-4"
          onChange={(e) => setInputText(e.target.value)}
          placeholder={deleteTableDetail.name}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteFunction}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
