import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Switch from "react-bootstrap/Switch";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import { Dish } from "../../../../interfaces";
import {
  axiosDeleteFunction,
  axiosPostFunction,
} from "../../../../useFullItems/axios";
import { faker } from "@faker-js/faker";
import axios from "axios";
import Head from "next/head";
import { DishItem } from "../../../../pages/customize_restaurant/multiple_dish";

interface Props {
  addItem: (item: DishItem) => void;
}

export const EntryForm = (props: Props) => {
  const { addItem } = props;
  const [dishImage, setDishImage] = useState<File>();
  const [dishUrl, setDishUrl] = useState("/images/default_food.jpg");
  const [dishName, setDishName] = useState<string>("");
  const [largeFull, setLargeFull] = useState<string>("");
  const [largeHalf, setLargeHalf] = useState<string>("");
  const [mediumFull, setMediumFull] = useState<string>("");
  const [mediumHalf, setMediumHalf] = useState<string>("");
  const [smallFull, setSmallFull] = useState<string>("");
  const [smallHalf, setSmallHalf] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // const createImageUrl = (img: File) => {
  //   if (!img) return "/images/burger.webp";
  //   else return URL.createObjectURL(img);
  // };

  const approvFunction = () => {
    if (!dishName) return alert("Please Fill name");

    addItem({
      description,
      name: dishName,
      FullLarge_Price: +largeFull,
      FullMedium_Price: +mediumFull,
      FullSmall_Price: +smallFull,
      HalfLarge_Price: +largeHalf,
      HalfMedium_Price: +mediumHalf,
      HalfSmall_Price: +smallHalf,
      image: dishImage,
      id: Math.floor(100000 + Math.random() * 900000),
    });
    setDishImage(undefined);
    setDishName("");
    setLargeFull("");
    setLargeHalf("");
    setMediumFull("");
    setMediumHalf("");
    setSmallFull("");
    setSmallHalf("");
    setDescription("");
  };

  useEffect(() => {
    if (dishImage) setDishUrl(URL.createObjectURL(dishImage));
    else setDishUrl("/images/default_food.jpg");
  }, [dishImage]);

  return (
    <Row className="mb-3  border-dark p-2">
      <Col
        xs={4}
        className="d-flex position-relative p-1 align-items-center border"
      >
        <Card.Img
          src={dishUrl}
          className="p-0"
          style={{ objectFit: "contain" }}
          height={200}
        />
        <div className="position-absolute border w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
          <img
            src="/icons/edit-white.svg"
            alt="edit icon"
            onClick={() => {
              const image = document.getElementById("imageInput")?.click();
            }}
            style={{ cursor: "pointer" }}
            height={80}
          />
        </div>

        <input
          type="file"
          className="d-none"
          id="imageInput"
          accept="image/*"
          onChange={(e) => {
            if (e?.target?.files?.[0]) {
              const image = e?.target?.files?.[0];
              if (image.size > 100000)
                return alert("Image Size should be less than 100kb");
              setDishImage(e?.target?.files?.[0]!);
            }
          }}
        />
      </Col>
      <Col>
        <Row>
          <Col className="d-flex flex-column">
            <Row className="pb-1">
              <Col>
                <InputGroup>
                  <InputGroup.Text className="d-none d-md-inline">
                    Name
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Dish Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    type="text"
                    value={dishName}
                    required
                    onChange={(e) => setDishName(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table size="sm" style={{ margin: 0, padding: 0 }}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Full</th>
                      <th>Half</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Large</th>
                      <td>
                        <InputGroup>
                          <Form.Control
                            placeholder="Price"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="number"
                            value={largeFull}
                            onChange={(e) => setLargeFull(e.target.value)}
                          />
                          <InputGroup.Text className="d-none d-lg-inline">
                            ₹
                          </InputGroup.Text>
                        </InputGroup>
                      </td>
                      <td>
                        <InputGroup>
                          <Form.Control
                            placeholder="Price"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="number"
                            value={largeHalf}
                            onChange={(e) => setLargeHalf(e.target.value)}
                          />
                          <InputGroup.Text className="d-none d-lg-inline">
                            ₹
                          </InputGroup.Text>
                        </InputGroup>
                      </td>
                    </tr>
                    <tr>
                      <th>Medium</th>
                      <td>
                        <InputGroup>
                          <Form.Control
                            placeholder="Price"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="number"
                            value={mediumFull}
                            onChange={(e) => setMediumFull(e.target.value)}
                          />
                          <InputGroup.Text className="d-none d-lg-inline">
                            ₹
                          </InputGroup.Text>
                        </InputGroup>
                      </td>
                      <td>
                        <InputGroup>
                          <Form.Control
                            placeholder="Price"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="number"
                            value={mediumHalf}
                            onChange={(e) => setMediumHalf(e.target.value)}
                          />
                          <InputGroup.Text className="d-none d-lg-inline">
                            ₹
                          </InputGroup.Text>
                        </InputGroup>
                      </td>
                    </tr>
                    <tr>
                      <th>Small</th>
                      <td>
                        <InputGroup>
                          <Form.Control
                            placeholder="Price"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="number"
                            value={smallFull}
                            onChange={(e) => setSmallFull(e.target.value)}
                          />
                          <InputGroup.Text className="d-none d-lg-inline">
                            ₹
                          </InputGroup.Text>
                        </InputGroup>
                      </td>
                      <td>
                        <InputGroup>
                          <Form.Control
                            placeholder="Price"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="number"
                            value={smallHalf}
                            onChange={(e) => setSmallHalf(e.target.value)}
                          />
                          <InputGroup.Text className="d-none d-lg-inline">
                            ₹
                          </InputGroup.Text>
                        </InputGroup>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex flex-column border">
            <Row className="flex-grow-1">
              <Col className="d-flex align-items-center">
                <InputGroup>
                  <InputGroup.Text className="d-none d-md-inline">
                    Description
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    placeholder="Dish Description"
                    aria-label="With textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row style={{ height: "30%" }}>
              <Col className="d-flex">
                <Button
                  variant="success"
                  className="flex-fill"
                  onClick={approvFunction}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
