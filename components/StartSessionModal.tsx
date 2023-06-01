import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Dish } from "../interfaces";
import { useAppSelector } from "../useFullItems/redux";
import { axiosPostFunction } from "../useFullItems/axios";

interface Props {
  handleClose: () => void;
  show: boolean;
  tableSectionId?: string;
  tableNumber?: number;
}

export const StartSessionModal = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const { tables } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const { handleClose, show, tableNumber, tableSectionId } = props;

  const tableInfo = tables.find((table) => table.id === tableSectionId);

  const startSessionFunction = () => {
    setLoading(true);
    if (tableSectionId && tableNumber) {
      axiosPostFunction({
        parentUrl: "sessions",
        data: {
          tableSectionId: tableSectionId,
          tableNumber: tableNumber,
        },
        thenFunction: () => {
          setLoading(false);
          handleClose();
        },
      });

      setLoading(false);
    }
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Body>
        <Modal.Title>
          Start Session of {tableInfo?.name} {tableInfo?.prefix}
          {tableNumber}
          {tableInfo?.suffix}
        </Modal.Title>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          disabled={loading}
          onClick={startSessionFunction}
        >
          {loading ? "loading..." : "Start Session"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
