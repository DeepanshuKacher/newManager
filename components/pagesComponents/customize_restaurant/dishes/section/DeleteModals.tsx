import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DishesSliceType } from "../../../../../interfaces";
import {
  axiosDeleteFunction,
  controllerUrls,
} from "../../../../../useFullItems/axios";

interface Props {
  show: boolean;
  handleClose: () => void;
  deleteSectionInfo: DishesSliceType;
}

export const DeleteModal = (props: Props) => {
  const { deleteSectionInfo, handleClose, show } = props;

  const deleteSection = () => {
    axiosDeleteFunction({
      parentUrl: controllerUrls.dishSection,
      childUrl: deleteSectionInfo.id,
    });

    handleClose();
  };

  return (
    <Modal backdrop="static" show={show}>
      <Modal.Header>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 className="display-6">
          Deleting a section will also delete dishesh it contain, are you sure
          to delete {deleteSectionInfo?.sectionName} section
        </h1>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteSection}>
          Yes I want to delete {deleteSectionInfo?.sectionName} seciton
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
