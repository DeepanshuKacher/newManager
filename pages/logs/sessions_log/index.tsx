import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import { useAxiosGet } from "../../../useFullItems/hooks";
import { SessionLog } from "../../../interfaces";
import { useAppSelector } from "../../../useFullItems/redux";
import { useState } from "react";

interface OrderModalProps {
  data: SessionLog | undefined;
  handleClose: () => void;
}
const OrderLogModal = (props: OrderModalProps) => {
  const { data, handleClose } = props;

  const { dishesh, tables } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const tableInfo = tables?.find((table) => table.id === data?.tableId);

  return (
    <Modal show={!!data} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {tableInfo?.prefix}
          {data?.tableNumber}
          {tableInfo?.suffix}
        </Modal.Title>
        <Modal.Title>
          {new Date(data?.sessionCreationTime || "").toDateString()}{" "}
          {new Date(data?.sessionCreationTime || "").toLocaleTimeString()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered>
          <tbody>
            {data?.Order_Logs.map((order, index) => {
              const dish = dishesh.find((dish) => dish.id === order.dishId);
              return (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{dish?.name}</td>
                  {order.fullQuantity ? (
                    <td>Full {order.fullQuantity}</td>
                  ) : null}
                  {order.halfQuantity ? (
                    <td>Half {order.halfQuantity}</td>
                  ) : null}
                  <td> {order.cost}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

function Sessions() {
  const [showSessionDetail, setSessionDetail] = useState<SessionLog>();

  const { tables } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const { data: sessionLogs } = useAxiosGet<SessionLog[]>({
    parentUrl: "sessions",
    childUrl: "log",
    useGlobalLoader: true,
  });

  return (
    <>
      <OrderLogModal
        data={showSessionDetail}
        handleClose={() => setSessionDetail(undefined)}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Table No.</th>
            <th>Pay</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {sessionLogs.map((session) => {
            const tableInfo = tables?.find(
              (table) => table.id === session.tableId
            );
            return (
              <tr key={session.uuid} onClick={() => setSessionDetail(session)}>
                <td>
                  {new Date(session.sessionCreationTime).toDateString()}{" "}
                  {new Date(session.sessionCreationTime).toLocaleTimeString()}
                </td>
                <td>
                  {tableInfo?.prefix}
                  {session.tableNumber}
                  {tableInfo?.suffix}
                </td>
                <td>
                  {session.Order_Logs.reduce((acc, item) => acc + item.cost, 0)}
                </td>
                <td>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => setSessionDetail(session)}
                    src="/icons/edit.svg"
                    alt="edit icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Sessions;
