import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useAppSelector } from "../../../../useFullItems/redux";
import { useEffect, useRef, useState } from "react";
import {
  axiosDeleteFunction,
  axiosGetFunction,
} from "../../../../useFullItems/axios";
import { Order } from "../../orders/redux";
import {
  calculatePrice,
  convertRedisOrderToOrder,
} from "../../../../useFullItems/functions";
import { useRouter } from "next/router";
import { OrderDetailModal } from "../../../../components/pagesComponents/realtime/orders/DetailModal";
import { DishModal } from "../../../../components/pagesComponents/customize_restaurant/dishes/dishname/DishModal";
import { Dish, OrderReturnFromRedis } from "../../../../interfaces";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";

import { TemplateToPrint } from "../../../../components/pagesComponents/customize_restaurant/template/TemplateToPrint";
import { constants } from "../../../../useFullItems/constants";
// import {
//   JsonOrder,
//   Kot,
// } from "../../../../useFullItems/functions/onLoad/fetchAndStoreFunctions";

/* Declare Types or interfaces here below */

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

interface RetreveOrdersFromServer {
  id: string;
  value: OrderReturnFromRedis;
}

type PythonPrintFormat = {
  name: string;
  quantity: number;
  price: number;
};

enum OperationType {
  Plus = "Plus",
  Minus = "Minus",
  Multiply = "Multiply",
  Divide = "Divide",
  Percentage = "Percentage",
}

/* Declare Types or interfaces here above */

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
  kotId?: Order["orderId"];
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

function TableSession() {
  /* initialization */

  const componentRef = useRef<any>();

  const router = useRouter();

  /* states and store */

  const { operationsArray, upperMarkDown } = useAppSelector(
    (store) => store.billingTamplate
  );

  const [tableOrders, setTableOrders] = useState<RetreveOrdersFromServer[]>([]);
  const [orderDetail, setOrderDetail] = useState<Order>();
  const [dishDetail, setDishDetail] = useState<Dish>();
  const [deleteItemName, setDeleteItemName] = useState("");
  const [deleteKotId, setDeleteKotId] = useState<Order["orderId"]>();
  const [deleteItemPrice, setDeleteItemPrice] = useState<number>();
  const [deleteItemOrderId, setDeleteItemOrderId] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);

  /* Temp items */
  // const [operationsArray, setOperationArray] = useState<>([]);

  const { billingTable } = useAppSelector((store) => store);

  const { tables, dishObj, id } = useAppSelector(
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

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765/bill");

    socket.onopen = () => {
      if (constants.IS_DEVELOPMENT) console.log("WebSocket connected");
      setIsWebSocketOpen(true);
      setWs(socket);
    };

    socket.onmessage = (event) => {
      if (constants.IS_DEVELOPMENT) console.log(event.data);
    };

    socket.onerror = (error) => {
      if (constants.IS_DEVELOPMENT) console.error("WebSocket error:", error);
      setIsWebSocketOpen(false);
    };

    socket.onclose = (event) => {
      if (constants.IS_DEVELOPMENT)
        console.log("WebSocket closed:", event.reason);
      setIsWebSocketOpen(false);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  /* functions */

  const printBillThroughWebsocket = () => {
    if (ws && ws.readyState === WebSocket.OPEN && sessionId) {
      const itemToSendForPrint: PythonPrintFormat[] = [];

      for (let x of tableOrders) {
        const { dishId, fullQuantity, halfQuantity, size } = x.value;

        const dishInfo = dishObj[dishId];

        const fullQyt = parseInt(fullQuantity);
        const halfQyt = parseInt(halfQuantity);
        if (fullQyt && halfQyt) {
          itemToSendForPrint.push({
            name: dishInfo?.name + "- F",
            quantity: fullQyt,
            price: dishInfo["price"][size]?.full || 0,
          });
          itemToSendForPrint.push({
            name: dishInfo?.name + "- H",
            quantity: halfQyt,
            price: dishInfo["price"][size]?.half || 0,
          });
        } else if (fullQyt) {
          itemToSendForPrint.push({
            name: dishInfo?.name + "- F",
            quantity: fullQyt,
            price: dishInfo["price"][size]?.full || 0,
          });
        } else if (halfQyt) {
          itemToSendForPrint.push({
            name: dishInfo?.name + "- H",
            quantity: halfQyt,
            price: dishInfo["price"][size]?.half || 0,
          });
        }
      }
      ws.send(JSON.stringify(itemToSendForPrint));
    }
  };

  const disableOrderModal = () => setOrderDetail(undefined);

  const getData = () => {
    if (sessionId)
      axiosGetFunction({
        parentUrl: "sessions",
        childUrl: sessionId,
        thenFunction: (data: RetreveOrdersFromServer[]) => {
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

  const clearSession = (modeofPayment: "cash" | "online") => {
    if (sessionId)
      axiosDeleteFunction({
        parentUrl: "sessions",
        childUrl: sessionId,
        data: {
          tableSectionId: billingTable.tableSectionId,
          tableNumber: billingTable.tableNumber,
          modeOfIncome: modeofPayment,
        },
        useGlobalLoader: true,
        thenFunction: routerPushToTableStatusPage,
      });
  };

  const totalPrice = () => {
    let totalPrice = 0;
    // if (tableOrders?.value.orders.length)
    for (let y of tableOrders) {
      // for (let y of x.value.orders) {
      const dish = dishObj[y.value.dishId];
      totalPrice += calculatePrice(convertRedisOrderToOrder(y.value), dish);
      // }
    }
    return totalPrice;
  };

  const returnAllOrders = () => {
    const returnArray: Order[] = [];

    for (let x of tableOrders) {
      // for (let y of x.value.orders) {

      returnArray.push(convertRedisOrderToOrder(x.value));
      // }
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
        retaurantId={id}
        tableSectionId={selectedTableSection?.id}
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
      <div className="border d-flex flex-row justify-content-around">
        <h3>
          {selectedTableSection?.prefix}
          {billingTable.tableNumber}
          {selectedTableSection?.suffix}
        </h3>
        <div className="d-flex flex-row ">
          <Button
            variant="success"
            size="sm"
            onClick={printBillThroughWebsocket}
            className="me-2"
          >
            Print Receipt
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => router.back()}
            className="me-2"
          >
            Back
          </Button>
          <Button size="sm" variant="info" onClick={getData} className="me-2">
            Refresh
          </Button>
          <Dropdown>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              className="me-2"
            >
              Clear Table
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => clearSession("cash")}>
                Cash Payment
              </Dropdown.Item>
              <Dropdown.Item onClick={() => clearSession("online")}>
                Online Payment
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Button
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
              </Button> */}
          {/* <ReactToPrint */}
          {/* trigger={() => ( */}

          {/* )} */}
          {/* content={() => componentRef.current} */}
          {/* /> */}
        </div>
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Dish Name</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableOrders?.map((item, index) => {
            const dish = dishObj[item.value.dishId];
            const price = calculatePrice(
              convertRedisOrderToOrder(item.value),
              dish
            );

            return (
              <tr key={item.value.orderId}>
                <td>{index + 1}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => setDishDetail(dish)}
                >
                  {dish?.name}
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setOrderDetail(convertRedisOrderToOrder(item.value))
                  }
                >
                  ₹{price}
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDeleteItemName(dish?.name!);
                    setDeleteItemOrderId(item.value.orderId);
                    setDeleteItemPrice(price);
                    setDeleteKotId(item.value.orderId);
                  }}
                >
                  Delete Item
                </td>
              </tr>
            );
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
