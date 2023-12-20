import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Order } from "../../../../pages/realtime/orders/redux";
import { useAppSelector } from "../../../../useFullItems/redux";
import { axiosPatchFunction } from "../../../../useFullItems/axios";
import { useRouter } from "next/router";

import Table from "react-bootstrap/Table";

interface Props {
  toggleOrderDetailModal: () => void;
  orderDetail: Order
  refreshFunction?: any;
}

export const OrderDetailModal = (props: Props) => {
  const router = useRouter();

  const { toggleOrderDetailModal, orderDetail, refreshFunction } = props;

  const [updateQuantityMode, setUpdateQuantityMode] = useState(false);

  const [fullQuantity, setFullQuantity] = useState(orderDetail.fullQuantity)
  const [halfQuantity, setHalfQuantity] = useState(orderDetail.halfQuantity);

  const allDishesh = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.dishesh
  );


  const updateQuantity = (orderDetail: Order) => {
    if (!orderDetail.orderId) return alert("No order selected");

    axiosPatchFunction({
      parentUrl: 'orders',
      childUrl: 'update',
      data: {
        orderId: orderDetail?.orderId,
        newFullQuantity: fullQuantity,
        newHalfQuantity: halfQuantity
      },
      thenFunction: () => {
        refreshFunction()
        toggleOrderDetailModal()
      }
    })
  };

  return (
    <Modal scrollable show={true} onHide={toggleOrderDetailModal}>
      {router.pathname === "/realtime/table_status/[table_name]" && (
        <Modal.Header>
          {updateQuantityMode ? (
            <Button
              variant="success"
              onClick={() => updateQuantity(orderDetail)}
            >
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
                <th>Full</th>
                <th>Half</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {
                    allDishesh.find((dish) => dish.id === orderDetail?.dishId)
                      ?.name
                  }
                </td>
                <td>{orderDetail?.size}</td>
                {updateQuantityMode ? (
                  <td>
                    <Button
                      onClick={() => setFullQuantity((current) => current + 1)}
                    >
                      +
                    </Button>{" "}
                    {fullQuantity}{" "}
                    <Button
                      onClick={() => {
                        if (fullQuantity > 1) {
                          setFullQuantity((currentValue) => currentValue - 1);
                        }
                      }}
                    >
                      -
                    </Button>
                  </td>
                ) : (
                  <td>{fullQuantity} </td>
                )}
                {updateQuantityMode ? (
                  <td>
                    <Button
                      onClick={() => setHalfQuantity((current) => current + 1)}
                    >
                      +
                    </Button>{" "}
                    {halfQuantity}{" "}
                    <Button
                      onClick={() => {
                        if (halfQuantity > 1) {
                          setHalfQuantity((currentValue) => currentValue - 1);
                        }
                      }}
                    >
                      -
                    </Button>
                  </td>
                ) : (
                  <td>{halfQuantity} </td>
                )}
                {/* {orderDetail?.fullQuantity ? (
         
                ) : null} */}
                {/* {orderDetail?.halfQuantity ? (
                  updateQuantityMode ? (
                    <td>
                      <Button
                        onClick={() => setNewQuantity((current) => current + 1)}
                      >
                        +
                      </Button>{" "}
                      {newQuantity} <Button>-</Button>
                    </td>
                  ) : (
                    <td>{orderDetail?.halfQuantity} </td>
                  )
                ) : null} */}
              </tr>
              {/* {orderDetail?.value.orders.map((order) => {
                const selectedDish = allDishesh.find(
                  (dish) => dish.id === order.dishId
                );

                return (
                  <tr key={order.orderId}>
                    <td>{selectedDish?.name}</td>
                    <td>{order.size}</td>
                    <td>{order.halfQuantity}</td>
                    <td>{order.fullQuantity}</td>
                  </tr>
                );
              })} */}
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
