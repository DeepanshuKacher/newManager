import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Order } from "../../../../pages/realtime/orders/redux";
import { useAppSelector } from "../../../../useFullItems/redux";
import { axiosPatchFunction } from "../../../../useFullItems/axios";
import { useRouter } from "next/router";
import {
  JsonOrder,
  Kot,
} from "../../../../useFullItems/functions/onLoad/fetchAndStoreFunctions";
import Table from "react-bootstrap/Table";

interface Props {
  toggleOrderDetailModal: () => void;
  orderDetail: Kot | null;
  refreshFunction?: any;
}

export const OrderDetailModal = (props: Props) => {
  const router = useRouter();

  const { toggleOrderDetailModal, orderDetail, refreshFunction } = props;

  const [updateQuantityMode, setUpdateQuantityMode] = useState(false);
  // const [newFullQuantity, setNewFullQuantity] = useState(
  //   parseInt(orderDetail?.value.)
  // );
  // const [newHalfQuantity, setNewHalfQuantity] = useState(
  //   parseInt(orderDetail?.halfQuantity!)
  // );

  const updateQuantityState = (
    plusOrMinus: "+" | "-",
    value: number,
    changeFunction: React.Dispatch<React.SetStateAction<number>>
  ) => {
    switch (plusOrMinus) {
      case "+":
        changeFunction((currentValue) => currentValue + 1);
        break;
      case "-":
        if (value > 1) changeFunction((currentValue) => currentValue - 1);
        break;
    }
  };

  // const updateQuantityState = (
  //   plusOrMinus: "+" | "-",
  //   fullOrHalf: "full" | "half"
  // ) => {
  //   switch (fullOrHalf) {
  //     case "full":
  //       if (newFullQuantity > 0) {
  //         switch (plusOrMinus) {
  //           case "+":
  //             setNewFullQuantity((current) => current + 1);
  //             break;

  //           case "-":
  //             setNewFullQuantity((current) => current - 1);
  //             break;
  //         }
  //       }
  //       break;

  //     case "half":
  //       if (newHalfQuantity > 0) {
  //         switch (plusOrMinus) {
  //           case "+":
  //             setNewHalfQuantity((current) => current + 1);
  //             break;

  //           case "-":
  //             setNewHalfQuantity((current) => current - 1);
  //             break;
  //         }
  //       }
  //       break;
  //   }
  // };

  const updateQuantity = (orderDetail: JsonOrder) => {
    if (orderDetail?.orderId)
      axiosPatchFunction({
        parentUrl: "orders",
        childUrl: "update",
        data: {
          orderId: orderDetail?.orderId,
          // halfQuantity: newHalfQuantity,
          // fullQuantity: newFullQuantity,
        },
        thenFunction: () => {
          refreshFunction();
          toggleOrderDetailModal();
        },
      });
  };

  return (
    <Modal scrollable show={true} onHide={toggleOrderDetailModal}>
      {router.pathname === "/realtime/table_status/[table_name]" && (
        <Modal.Header>
          {updateQuantityMode ? (
            <Button variant="success" /* onClick={()=>updateQuantity()} */>
              Save
            </Button>
          ) : (
            <Button onClick={() => setUpdateQuantityMode(true)}>
              Update Quantity
            </Button>
          )}
        </Modal.Header>
      )}
      <Modal.Body>
        <Container fluid className="text-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dish</th>
                <th>Size</th>
                <th>Half</th>
                <th>Full</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail?.value.orders.map((order) => {
                const selectedDish = useAppSelector(
                  (store) => store.restaurantInfo.defaultValues.dishesh
                ).find((dish) => dish.id === order.dishId);

                return (
                  <tr key={order.orderId}>
                    <td>{selectedDish?.name}</td>
                    <td>{order.size}</td>
                    <td>{order.halfQuantity}</td>
                    <td>{order.fullQuantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

/*              <Modal.Title as="h1">{selectedDish?.name}</Modal.Title>
                <Row className="my-3">
                  <Col xs={12} style={{ fontSize: 20 }}>
                    {order.size}
                  </Col>
                  <Col xs={6}>Half</Col>
                  <Col xs={6}>Full</Col>
                  {order.halfQuantity && (
                    <Col xs={6}>
                      {updateQuantityMode && parseInt(order.halfQuantity) ? (
                        <Button
                          onClick={() =>
                            // updateQuantityState(
                            //   "+",
                            //   newHalfQuantity,
                            //   setNewHalfQuantity
                            // )
                            alert("update half")
                          }
                        >
                          +
                        </Button>
                      ) : null}
                      {order.halfQuantity}
                      {updateQuantityMode && parseInt(order?.halfQuantity) ? (
                        <Button
                          onClick={() =>
                            // updateQuantityState(
                            //   "-",
                            //   newHalfQuantity,
                            //   setNewHalfQuantity
                            // )
                            alert("update full quantity")
                          }
                        >
                          -
                        </Button>
                      ) : null}
                    </Col>
                  )}

                  {order?.fullQuantity && (
                    <Col xs={6}>
                      {updateQuantityMode && parseInt(order?.fullQuantity) ? (
                        <Button
                          onClick={() =>
                            // updateQuantityState(
                            //   "+",
                            //   newFullQuantity,
                            //   setNewFullQuantity
                            // )
                            alert("update full quantity")
                          }
                        >
                          +
                        </Button>
                      ) : null}{" "}
                      {order.fullQuantity}{" "}
                      {updateQuantityMode && parseInt(order?.fullQuantity) ? (
                        <Button
                          onClick={() =>
                            // updateQuantityState(
                            //   "-",
                            //   newFullQuantity,
                            //   setNewFullQuantity
                            // )
                            alert("update full quantity")
                          }
                        >
                          -
                        </Button>
                      ) : null}
                    </Col>
                  )}
                </Row>
                {order?.user_description && (
                  <Row className="mb-3">
                    <Col className="d-flex flex-row">
                      <h5>Description :-</h5>
                      <p className="ms-2 text-muted">
                        {order?.user_description}
                      </p>
                    </Col>
                  </Row>
                )} */
