import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { DishesSliceType } from "../../../../../interfaces";
import { useState } from "react";
import {
  axiosPatchFunction,
  axiosPostFunction,
  controllerUrls,
} from "../../../../../useFullItems/axios";

export const EditModal = ({
  // show,
  handleClose,
  handleDelete,
  editSectionInfo,
}: // sectionTitle = "",
// toggleReload,
{
  // show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  editSectionInfo: DishesSliceType | undefined;
  // addMode: boolean;
  // sectionTitle?: string;

  // toggleReload?: () => void;
}) => {
  const [sectionTitle, setSectionTitle] = useState(
    editSectionInfo?.sectionName || ""
  );

  // console.log({ editSectionInfo });

  const createSection = () => {
    axiosPostFunction({
      parentUrl: "dish-sections",
      data: { sectionName: sectionTitle },
      // thenFunction: toggleReload,
    });

    handleClose();
  };

  const updateSection = () => {
    axiosPatchFunction({
      parentUrl: controllerUrls.dishSection,
      childUrl: editSectionInfo?.id,
      data: { sectionName: sectionTitle },
    });

    handleClose();
  };

  const addMode = !editSectionInfo?.sectionName;

  return (
    <Modal show={true} backdrop="static" onHide={handleClose}>
      <Modal.Header>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <FormControl
            style={{ fontSize: "1.5rem" }}
            placeholder="section name"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
          <InputGroup.Text>Section Name</InputGroup.Text>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {!addMode && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
        {!addMode && (
          <Button variant="primary" onClick={updateSection}>
            Save Changes
          </Button>
        )}
        {addMode && (
          <Button variant="success" onClick={createSection}>
            Create Section
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
