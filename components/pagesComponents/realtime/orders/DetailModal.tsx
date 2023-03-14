import React from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Order } from "../../../../pages/realtime/orders/redux";
import { useAppSelector } from "../../../../useFullItems/redux";

interface Props {
  toggleOrderDetailModal: () => void;
  orderDetail: Order | null;
}

export const OrderDetailModal = (props: Props) => {
  const { toggleOrderDetailModal, orderDetail } = props;

  const selectedDish = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.dishesh
  ).find((dish) => dish.id === orderDetail?.dishId);

  return (
    <Modal scrollable show={true} onHide={toggleOrderDetailModal}>
      <Modal.Body>
        <Container fluid className="text-center">
          <Modal.Title as="h1">{selectedDish?.name}</Modal.Title>
          <Row className="my-3">
            <Col xs={12} style={{ fontSize: 20 }}>
              {orderDetail?.size}
            </Col>
            <Col xs={6}>Half</Col>
            <Col xs={6}>Full</Col>
            <Col xs={6}>{orderDetail?.halfQuantity}</Col>
            <Col xs={6}>{orderDetail?.fullQuantity}</Col>
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
