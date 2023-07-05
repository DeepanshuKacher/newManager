import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

// import { SessionLog } from "../../../interfaces";
import { useAppSelector } from "../../../useFullItems/redux";
import { useEffect, useRef, useState } from "react";
import { axiosGetFunction } from "../../../useFullItems/axios";
import { calculatePrice, formatDate } from "../../../useFullItems/functions";
import { Order } from "../../realtime/orders/redux";
import { ComponentToPrint } from "../../../components/pagesComponents/logs/order_logs/KotTemplate";
import ReactToPrint from "react-to-print";

export enum OrderBy {
  waiter,
  self,
  manager,
}

export interface KotOrderLog {
  id: string;
  dishId: string;
  kotLogId: string;
  size: Order["size"];
  dateTime: string;
  cost: number;
  fullQuantity: number | null;
  halfQuantity: number | null;
  restaurantId: string;
  tableId: string | null;
  tableNumber: number | null;
  user_description: string;
  orderBy: OrderBy;
  waiterId: string | null;
  chefId: null | string;
  sessionLogsId: string;
}

export interface KOTLogs {
  id: string;
  parcel: boolean;
  sessionLogsId: string | null;
  tableId: string | null;
  tableNumber: number | null;
  orderedBy: OrderBy;
  waiterId: string;
  chefId: string | null;
  restaurantId: string;
  createdAt: string;
  KotOrder: KotOrderLog[];
  table: typeof Table;
}

// export interface KOTLogs {
//   id: string;
//   parcel: boolean;
//   sessionLogsId: string | null;
//   tableId: string | null;
//   tableNumber: number | null;
//   orderedBy: OrderBy;
//   waiterId: string;
//   chefId: string | null;
//   restaurantId: string;
//   createdAt: string;
//   session: null | {
//     tableId: string;
//     tableNumber: number;
//   };
// }

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
  // const [showSessionDetail, setSessionDetail] = useState<SessionLog>();
  const kotPrintTemplate = useRef<any>();
  const [selectedKot, setSelectKot] = useState<KOTLogs>();
  const [kot, setKot] = useState<KOTLogs[]>([]);
  // const noRepeatContainer = useAppSelector(
  //   (store) => store.orderContainer.noRepeatContainer
  // );

  const { tables } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  useEffect(() => {
    getKots();
  }, []);

  useEffect(() => {
    if (selectedKot) {
      document.getElementById("clickToPrintKOT_In_Log")?.click();
    }
  }, [selectedKot]);

  const getKots = () => {
    axiosGetFunction({
      parentUrl: "orders",
      childUrl: "logs",
      thenFunction: (data: KOTLogs[]) => {
        console.log(data);
        setKot(data);
      },
      useGlobalLoader: true,
    });
  };

  // const convertNestedOrderKeyArrayToNestedOrderUUID_Array = (
  //   nestedOrderKeysArray: string[][]
  // ) => {
  //   const tempContainer: string[][] = [];
  //   nestedOrderKeysArray.forEach((orderKeyArray) => {
  //     const temp: string[] = [];

  //     orderKeyArray.forEach((orderKey) => {
  //       temp.push(convertOrderKeyToUUID(orderKey));
  //     });

  //     tempContainer.push(temp);
  //   });

  //   return tempContainer;
  // };

  // const convertOrderKeyToUUID = (orderKey: string) => {
  //   return orderKey.split(":")[0];
  // };

  return (
    <>
      {/* <OrderLogModal
        data={selectedKot}
        handleClose={() => setSelectKot(undefined)}
      /> */}
      <ComponentToPrint kot={selectedKot} ref={kotPrintTemplate} />
      <ReactToPrint
        content={() => kotPrintTemplate.current}
        onAfterPrint={() => setSelectKot(undefined)}
        trigger={() => (
          <button
            id="clickToPrintKOT_In_Log"
            style={{
              width: 0,
              height: 0,
              margin: 0,
              outline: 0,
              padding: 0,
              display: "none",
            }}
          ></button>
          // <img style={{ width: 24 }} src="/icons/print.svg/" alt="print icon" />
        )}
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
          {kot.map((kot) => {
            // const orderDetail = noRepeatContainer?.[orderArray?.[0]];
            // const tableInfo = tables?.find(
            //   (table) => table.id === orderDetail?.tableSectionId
            // );
            const tableInfo = kot.parcel
              ? null
              : tables?.find((table) => table.id === kot?.tableId);
            return (
              <tr key={kot.id}>
                <td
                //  onClick={() => setSelectKot(orderArray)}
                >
                  {formatDate(kot.createdAt)}
                </td>
                <td
                //  onClick={() => setSelectKot(orderArray)}
                >
                  {tableInfo
                    ? `${tableInfo?.prefix}${kot?.tableNumber}${tableInfo?.suffix}`
                    : "parcel"}
                </td>
                <td onClick={() => setSelectKot(kot)}>
                  <img
                    style={{ width: 24 }}
                    src="/icons/print.svg/"
                    alt="print icon"
                  />
                </td>
                {/* <td>
                  <img
                    style={{ cursor: "pointer" }}
                    // onClick={() => setSessionDetail(session)}
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
