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

interface Props {
  toggleOrderDetailModal: () => void;
  orderDetail: Order | null;
  refreshFunction?: any;
}

export const OrderDetailModal = (props: Props) => {
  const router = useRouter();

  const { toggleOrderDetailModal, orderDetail, refreshFunction } = props;

  const [updateQuantityMode, setUpdateQuantityMode] = useState(false);
  const [newFullQuantity, setNewFullQuantity] = useState(
    parseInt(orderDetail?.fullQuantity!)
  );
  const [newHalfQuantity, setNewHalfQuantity] = useState(
    parseInt(orderDetail?.halfQuantity!)
  );

  console.log({ orderDetail });

  const selectedDish = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.dishesh
  ).find((dish) => dish.id === orderDetail?.dishId);

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

  const updateQuantity = () => {
    if (orderDetail?.orderId)
      axiosPatchFunction({
        parentUrl: "orders",
        childUrl: "update",
        data: {
          orderId: orderDetail?.orderId,
          halfQuantity: newHalfQuantity,
          fullQuantity: newFullQuantity,
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
            <Button variant="success" onClick={updateQuantity}>
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
          <Modal.Title as="h1">{selectedDish?.name}</Modal.Title>
          <Row className="my-3">
            <Col xs={12} style={{ fontSize: 20 }}>
              {orderDetail?.size}
            </Col>
            <Col xs={6}>Half</Col>
            <Col xs={6}>Full</Col>
            {orderDetail?.halfQuantity && (
              <Col xs={6}>
                {updateQuantityMode && parseInt(orderDetail?.halfQuantity) ? (
                  <Button
                    onClick={() =>
                      updateQuantityState(
                        "+",
                        newHalfQuantity,
                        setNewHalfQuantity
                      )
                    }
                  >
                    +
                  </Button>
                ) : null}{" "}
                {newHalfQuantity}{" "}
                {updateQuantityMode && parseInt(orderDetail?.halfQuantity) ? (
                  <Button
                    onClick={() =>
                      updateQuantityState(
                        "-",
                        newHalfQuantity,
                        setNewHalfQuantity
                      )
                    }
                  >
                    -
                  </Button>
                ) : null}
              </Col>
            )}

            {orderDetail?.fullQuantity && (
              <Col xs={6}>
                {updateQuantityMode && parseInt(orderDetail?.fullQuantity) ? (
                  <Button
                    onClick={() =>
                      updateQuantityState(
                        "+",
                        newFullQuantity,
                        setNewFullQuantity
                      )
                    }
                  >
                    +
                  </Button>
                ) : null}{" "}
                {newFullQuantity}{" "}
                {updateQuantityMode && parseInt(orderDetail?.fullQuantity) ? (
                  <Button
                    onClick={() =>
                      updateQuantityState(
                        "-",
                        newFullQuantity,
                        setNewFullQuantity
                      )
                    }
                  >
                    -
                  </Button>
                ) : null}
              </Col>
            )}
          </Row>

          {orderDetail?.user_description && (
            <Row className="mb-3">
              <Col className="d-flex flex-row">
                <h5>Description :-</h5>
                <p className="ms-2 text-muted">
                  {orderDetail?.user_description}
                </p>
              </Col>
            </Row>
          )}
          {/* <ListGroup> // this is for addons don't delete it
            <ListGroup.Item>Extra-chilli</ListGroup.Item>
            <ListGroup.Item>Extra-Panner</ListGroup.Item>
            <ListGroup.Item>Extra-Lolipop</ListGroup.Item>
          </ListGroup> */}
        </Container>
      </Modal.Body>
    </Modal>
  );
};
