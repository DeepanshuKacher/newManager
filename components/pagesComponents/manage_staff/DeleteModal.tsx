import { MutableRefObject, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { axiosDeleteFunction } from "../../../useFullItems/axios";
import { WaiterType } from "../../../interfaces";
import { useAppSelector } from "../../../useFullItems/redux";
import { constants } from "../../../useFullItems/constants";

interface Props {
  handleClose: () => void;
  workerDetail: WaiterType;
  deleteType: "waiters" | "chefs";
}

export const DeleteModal = (props: Props) => {
  const { handleClose, workerDetail, deleteType } = props;

  const inputRestaurantName = useRef<HTMLInputElement | null>(null);

  const restaurantInfo = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const deleteWorker = () => {
    if (inputRestaurantName.current?.value !== "remove") {
      return alert(`Please type remove in input to proceed`);
    }

    axiosDeleteFunction({
      parentUrl: deleteType,
      childUrl: workerDetail.id,
      data: { name: workerDetail.name },
    });

    handleClose();
  };

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure to remove {workerDetail.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Type <i>remove</i> to proceed
      </Modal.Body>
      <FormControl type="text" ref={inputRestaurantName} placeholder="remove" />
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteWorker}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
