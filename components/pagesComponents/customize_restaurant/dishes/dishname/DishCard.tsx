import React, { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Switch from "react-bootstrap/Switch";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import { MODE } from "../../../../../pages/customize_restaurant/dishes/[dishname]";
import { Dish } from "../../../../../interfaces";

interface Props {
  openViewModel: (para: Dish) => void;
  dishInfo: Dish;
}

const DishPrice = (price: number | undefined) => {
  if (price) return <td>₹{price}</td>;
  else return <td>Nil</td>;
};

export const DishCard = (props: Props) => {
  const { dishInfo, openViewModel } = props;
  return (
    <Col xs={6} sm={4} md={3} xl={2}>
      <Card className={`${!dishInfo.available && "bg-secondary"}`}>
        <Card.Img
          variant="top"
          src={dishInfo?.imageUrl || "/images/default_food.jpg"}
          height={200}
          style={{ objectFit: "cover" }}
        />
        <Card.Title className="text-center mt-1">{dishInfo.name}</Card.Title>
        <Card.Body>
          <Table size="sm">
            <thead>
              <tr>
                <th></th>
                <th>Full</th>
                <th>Half</th>
              </tr>
            </thead>
            <tbody>
              {dishInfo.price.large ? (
                <tr>
                  <td>Large</td>
                  {DishPrice(dishInfo.price.large.full)}
                  {DishPrice(dishInfo.price.large.half)}
                </tr>
              ) : null}

              {dishInfo.price.medium ? (
                <tr>
                  <td>Medium</td>
                  {DishPrice(dishInfo.price.medium.full)}
                  {DishPrice(dishInfo.price.medium.half)}
                </tr>
              ) : null}
              {dishInfo.price.small ? (
                <tr>
                  <td>Small</td>
                  {DishPrice(dishInfo.price.small.full)}
                  {DishPrice(dishInfo.price.small.half)}
                </tr>
              ) : null}
            </tbody>
          </Table>
          {/* {dishInfo.addOns.length > 0 && (
            <Row className="d-none d-md-block">
              <Col>
                <ListGroup>
                  <ListGroup.Item className="fw-semibold bg-transparent">
                    Add ons
                  </ListGroup.Item>

                  {dishInfo.addOns.map((value) => {
                    return (
                      <ListGroup.Item
                        key={value.id}
                        className="d-flex justify-content-between bg-transparent"
                      >
                        <span>{value.name}</span> <span>₹{value.price}</span>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
            </Row>
          )} */}
          {dishInfo.description && (
            <Row className="d-none d-md-block">
              <Col>
                <span className="fw-semibold">Description :- </span>
                {dishInfo.description}
              </Col>
            </Row>
          )}
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col xs={6}>
              <Button variant="warning" onClick={() => openViewModel(dishInfo)}>
                View
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};
