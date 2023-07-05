import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useAppSelector } from "../../../../useFullItems/redux";
import { useEffect, useRef, useState } from "react";
import {
  axiosDeleteFunction,
  axiosGetFunction,
} from "../../../../useFullItems/axios";
import { Order } from "../../orders/redux";
import { calculatePrice } from "../../../../useFullItems/functions";
import { useRouter } from "next/router";
import { OrderDetailModal } from "../../../../components/pagesComponents/realtime/orders/DetailModal";
import { DishModal } from "../../../../components/pagesComponents/customize_restaurant/dishes/dishname/DishModal";
import { Dish } from "../../../../interfaces";
import Modal from "react-bootstrap/Modal";
import ReactToPrint from "react-to-print";

import { TemplateToPrint } from "../../../../components/pagesComponents/customize_restaurant/template/TemplateToPrint";
import {
  JsonOrder,
  Kot,
} from "../../../../useFullItems/functions/onLoad/fetchAndStoreFunctions";
import { constants } from "../../../../useFullItems/constants";

function DeleteConformationModal({
  dishName,
  orderId,
  sessionId,
  setOrderId,
  orderPrice,
  kotId,
  refreshFunction,
}: {
  dishName: string;
  sessionId: string;
  orderId: string;
  setOrderId: any;
  orderPrice: number | undefined;
  kotId?: Kot["id"];
  refreshFunction?: any;
}) {
  const deleteOrder = () => {
    if (!orderId) return alert("No orderid");
    if (!kotId) return alert("No kotId");
    axiosDeleteFunction({
      parentUrl: "orders",
      childUrl: "order",
      data: {
        orderId,
        kotId,
      },
      thenFunction: () => {
        setOrderId("");
        refreshFunction();
      },
    });
  };

  return (
    <Modal show={true} centered>
      <Modal.Body>
        Are you sure to delete {dishName} ₹{orderPrice}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={deleteOrder} variant="danger">
          Yes, Delete
        </Button>
        <Button onClick={() => setOrderId("")}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

enum OperationType {
  Plus = "Plus",
  Minus = "Minus",
  Multiply = "Multiply",
  Divide = "Divide",
  Percentage = "Percentage",
}

enum GainLoss {
  gain = "gain",
  loss = "loss",
}

type Operations = {
  label: string;
  number: number;
  operation: OperationType;
  gainLoss: GainLoss;
};

function TableSession() {
  /* initialization */

  const componentRef = useRef<any>();

  const router = useRouter();

  /* states and store */

  const { operationsArray, upperMarkDown } = useAppSelector(
    (store) => store.billingTamplate
  );

  const [tableOrders, setTableOrders] = useState<Kot[]>([]);
  const [orderDetail, setOrderDetail] = useState<Kot["value"]["orders"][0]>();
  const [dishDetail, setDishDetail] = useState<Dish>();
  const [deleteItemName, setDeleteItemName] = useState("");
  const [deleteKotId, setDeleteKotId] = useState<Kot["id"]>();
  const [deleteItemPrice, setDeleteItemPrice] = useState<number>();
  const [deleteItemOrderId, setDeleteItemOrderId] = useState("");

  /* Temp items */
  // const [operationsArray, setOperationArray] = useState<>([]);

  const { billingTable } = useAppSelector((store) => store);

  const { tables, dishesh } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const selectedTableSection = tables.find(
    (table) => table.id === billingTable.tableSectionId
  );

  const sessionId = useAppSelector((store) => store.tableStatus.tableDetail)?.[
    billingTable?.tableSectionId!
  ]?.[billingTable?.tableNumber!];

  /* useEffects */
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (billingTable.tableSectionId === undefined)
      router.push("/realtime/table_status");
  }, []);

  // useEffect(() => {
  //   axiosGetFunction({
  //     parentUrl: "templates",
  //     thenFunction: (e: {
  //       operations: Operations[];
  //       upperSectionText: string;
  //     }) => {
  //       setUpperMarkDown(e.upperSectionText);
  //       setOperationArray(e.operations);
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log(tableOrders);
  // }, [tableOrders]);

  /* functions */

  const disableOrderModal = () => setOrderDetail(undefined);

  const getData = () => {
    if (sessionId)
      axiosGetFunction({
        parentUrl: "sessions",
        childUrl: sessionId,
        thenFunction: (data: Kot[]) => {
          if (constants.IS_DEVELOPMENT) console.log(data);
          setTableOrders(data);
        },
        useGlobalLoader: true,
      });
  };

  const routerPushToTableStatusPage = () => {
    router.push("/realtime/table_status");
  };

  // const deleteOrder = (dishId: string, kotId: string) => {
  //   if (dishId && kotId)
  //     axiosDeleteFunction({
  //       parentUrl: "orders",
  //       childUrl: "order",
  //       data: {
  //         dishId,
  //         kotId,
  //       },
  //     });
  // };

  const clearSession = () => {
    if (sessionId)
      axiosDeleteFunction({
        parentUrl: "sessions",
        childUrl: sessionId,
        data: {
          tableSectionId: billingTable.tableSectionId,
          tableNumber: billingTable.tableNumber,
        },
        useGlobalLoader: true,
        thenFunction: routerPushToTableStatusPage,
      });
  };

  const totalPrice = () => {
    let totalPrice = 0;
    // if (tableOrders?.value.orders.length)
    for (let x of tableOrders) {
      for (let y of x.value.orders) {
        const dish = dishesh.find((dish) => dish.id === y.dishId);
        totalPrice += calculatePrice(y, dish);
      }
    }
    return totalPrice;
  };

  const returnAllOrders = () => {
    const returnArray: JsonOrder[] = [];

    for (let x of tableOrders) {
      for (let y of x.value.orders) {
        returnArray.push(y);
      }
    }
    return returnArray;
  };

  return (
    <>
      <TemplateToPrint
        ref={componentRef}
        upperMarkDown={upperMarkDown!}
        operationsArray={operationsArray!}
        orders={returnAllOrders()}
        prefix={selectedTableSection?.prefix}
        suffix={selectedTableSection?.suffix}
        tableNumber={billingTable?.tableNumber || 0}
      />
      {orderDetail && (
        <OrderDetailModal
          orderDetail={orderDetail}
          toggleOrderDetailModal={disableOrderModal}
          refreshFunction={getData}
        />
      )}
      {deleteItemName && deleteItemOrderId && deleteKotId && (
        <DeleteConformationModal
          sessionId={sessionId!}
          dishName={deleteItemName}
          orderId={deleteItemOrderId}
          setOrderId={setDeleteItemOrderId}
          orderPrice={deleteItemPrice}
          kotId={deleteKotId}
          refreshFunction={getData}
        />
      )}

      <DishModal
        dishInfo={dishDetail!}
        setMode={() => setDishDetail(undefined)}
        showHeader={false}
      />
      <Table bordered hover>
        <thead>
          <tr>
            <th colSpan={4} style={{ position: "relative" }}>
              {selectedTableSection?.prefix}
              {billingTable.tableNumber}
              {selectedTableSection?.suffix}
              <Button
                size="sm"
                variant="danger"
                style={{
                  position: "absolute",
                  right: 190,
                  top: "50%",
                  translate: "0 -50%",
                }}
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button
                size="sm"
                variant="info"
                style={{
                  position: "absolute",
                  right: 110,
                  top: "50%",
                  translate: "0 -50%",
                }}
                onClick={getData}
              >
                Refresh
              </Button>
              <Button
                size="sm"
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  translate: "0 -50%",
                }}
                onClick={clearSession}
              >
                Clear Table
              </Button>
              <ReactToPrint
                trigger={() => (
                  <Button
                    variant="success"
                    size="sm"
                    style={{
                      position: "absolute",
                      right: 250,
                      top: "50%",
                      translate: "0 -50%",
                    }}
                    // onClick={() => alert("prient recepit")}
                  >
                    Print Receipt
                  </Button>
                )}
                content={() => componentRef.current}
              />
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>Dish Name</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableOrders?.map((item, index) => {
            return item.value.orders.map((order) => {
              const dish = dishesh.find((dish) => dish.id === order.dishId);
              const price = calculatePrice(order, dish);

              return (
                <tr key={order.orderId}>
                  <td>{index + 1}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => setDishDetail(dish)}
                  >
                    {dish?.name}
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => setOrderDetail(order)}
                  >
                    ₹{price}
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setDeleteItemName(dish?.name!);
                      setDeleteItemOrderId(order.orderId);
                      setDeleteItemPrice(price);
                      setDeleteKotId(item.id);
                    }}
                  >
                    Delete Item
                  </td>
                </tr>
              );
            });
          })}

          <tr>
            <th colSpan={2}>Total</th>
            <th>₹{totalPrice()}</th>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TableSession;
