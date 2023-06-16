import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import { SessionLog } from "../../../interfaces";
import { useAppSelector } from "../../../useFullItems/redux";
import { useEffect, useState } from "react";
import { axiosGetFunction } from "../../../useFullItems/axios";
import { calculatePrice, formatDate } from "../../../useFullItems/functions";
import { Order } from "../../realtime/orders/redux";

interface OrderModalProps {
  data: string[] | undefined;
  handleClose: () => void;
}
const OrderLogModal = (props: OrderModalProps) => {
  const { data, handleClose } = props;

  const { dishesh, tables } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  // const noRepeatContainer = useAppSelector(
  //   (store) => store.orderContainer.noRepeatContainer
  // );

  // const orderInfo: Order | undefined = noRepeatContainer[data?.[0] || ""];

  // const tableInfo = tables?.find(
  //   (table) => table.id === orderInfo?.tableSectionId
  // );

  return (
    <Modal show={!!data} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {/* {tableInfo?.prefix}
          {orderInfo?.tableNumber}
          {tableInfo?.suffix} */}
        </Modal.Title>
        <Modal.Title>
          Hello
          {/* {formatDate(orderInfo?.createdAt)} */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    {/*     <Table striped bordered>
          <tbody>
            {data?.map((orderUUID, index) => {
              const currentOrderInfo = noRepeatContainer[orderUUID];
              const dish = dishesh.find(
                (dish) => dish.id === currentOrderInfo?.dishId
              );
              return (
                <tr key={orderUUID}>
                  <td>{index + 1}</td>
                  <td>{dish?.name}</td>
                  {currentOrderInfo.fullQuantity ? (
                    <td>Full {currentOrderInfo.fullQuantity}</td>
                  ) : null}
                  {currentOrderInfo.halfQuantity ? (
                    <td>Half {currentOrderInfo.halfQuantity}</td>
                  ) : null}
                  <td> {calculatePrice(currentOrderInfo, dish)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table> */}
      </Modal.Body>
    </Modal>
  );
};

function OrderLogs() {
  const [showSessionDetail, setSessionDetail] = useState<SessionLog>();
  const [selectedKot, setSelectKot] = useState<string[]>();
  const [kot, setKot] = useState<string[][]>([[]]);
  // const noRepeatContainer = useAppSelector(
  //   (store) => store.orderContainer.noRepeatContainer
  // );

  const { tables } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  useEffect(() => {
    getKots();
  }, []);

  const getKots = () => {
    axiosGetFunction({
      parentUrl: "kot",
      thenFunction: (data: string[][]) => {
        setKot(convertNestedOrderKeyArrayToNestedOrderUUID_Array(data));
      },
    });
  };

  const convertNestedOrderKeyArrayToNestedOrderUUID_Array = (
    nestedOrderKeysArray: string[][]
  ) => {
    const tempContainer: string[][] = [];
    nestedOrderKeysArray.forEach((orderKeyArray) => {
      const temp: string[] = [];

      orderKeyArray.forEach((orderKey) => {
        temp.push(convertOrderKeyToUUID(orderKey));
      });

      tempContainer.push(temp);
    });

    return tempContainer;
  };

  const convertOrderKeyToUUID = (orderKey: string) => {
    return orderKey.split(":")[0];
  };

  return (
    <>
      <OrderLogModal
        data={selectedKot}
        handleClose={() => setSelectKot(undefined)}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Table No.</th>
            <th>Print KOT</th>
            {/* <th>Pay</th> */}
            {/* <th>View</th> */}
          </tr>
        </thead>
        <tbody>
          {kot.map((orderArray, index) => {
            // const orderDetail = noRepeatContainer?.[orderArray?.[0]];
            // const tableInfo = tables?.find(
            //   (table) => table.id === orderDetail?.tableSectionId
            // );
            return (
              <tr key={orderArray?.[0] ?? 0}>
      {/*           <td onClick={() => setSelectKot(orderArray)}>
                  {formatDate(orderDetail?.createdAt)}
                </td>
                <td onClick={() => setSelectKot(orderArray)}>
                  {tableInfo?.prefix}
                  {orderDetail?.tableNumber}
                  {tableInfo?.suffix}
                </td> */}
                <td
                //  onClick={() => window.print()}
                >
                  <img
                    style={{ width: 24 }}
                    src="/icons/print.svg/"
                    alt="print icon"
                  />
                </td>
                {/* <td>
                  {session.Order_Logs.reduce((acc, item) => acc + item.cost, 0)}
                </td> */}
                {/* <td>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => setSessionDetail(session)}
                    src="/icons/edit.svg"
                    alt="edit icon"
                  />
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default OrderLogs;
