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
  defaultValue: DishItem;
  deleteFunction: (id: number) => void;
  editCurrentItem: (id: number, editItem: DishItem) => void;
}

function DishInfo(props: Props) {
  const { defaultValue, deleteFunction, editCurrentItem } = props;
  const [newDishImage, setNewDishImage] = useState<File | undefined>(
    defaultValue?.image!
  );
  const [newdishUrl, setNewDishUrl] = useState("/images/default_food.jpg");
  const [dishName, setDishName] = useState<string>(defaultValue?.name || "");
  const [largeFull, setLargeFull] = useState<string>(
    defaultValue?.FullLarge_Price?.toString() || ""
  );
  const [largeHalf, setLargeHalf] = useState<string>(
    defaultValue?.HalfLarge_Price?.toString() || ""
  );
  const [mediumFull, setMediumFull] = useState<string>(
    defaultValue?.FullMedium_Price?.toString() || ""
  );
  const [mediumHalf, setMediumHalf] = useState<string>(
    defaultValue?.HalfMedium_Price?.toString() || ""
  );
  const [smallFull, setSmallFull] = useState<string>(
    defaultValue?.FullSmall_Price?.toString() || ""
  );
  const [smallHalf, setSmallHalf] = useState<string>(
    defaultValue?.HalfSmall_Price?.toString() || ""
  );
  const [description, setDescription] = useState<string>(
    defaultValue?.description || ""
  );
  const [editMode, setEditMode] = useState(false);

  const editFunction = () => {
    editCurrentItem(defaultValue.id, {
      description,
      name: dishName,
      FullLarge_Price: +largeFull,
      FullMedium_Price: +mediumFull,
      FullSmall_Price: +smallFull,
      HalfLarge_Price: +largeHalf,
      HalfMedium_Price: +mediumHalf,
      HalfSmall_Price: +smallHalf,
      image: newDishImage,
      id: defaultValue.id,
    });
    toggleEdit();
  };

  const toggleEdit = () => setEditMode((currentValue) => !currentValue);

  useEffect(() => {
    if (newDishImage) setNewDishUrl(URL.createObjectURL(newDishImage));
  }, [newDishImage]);

  return (
    <Row className="mb-3  border-dark p-2">
      <Col
        xs={4}
        className="d-flex position-relative p-1 align-items-center border"
      >
        <Card.Img
          src={newdishUrl}
          className="p-0"
          style={{ objectFit: "contain" }}
          height={200}
        />
        {editMode && (
          <div className="position-absolute border w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
            <img
              src="/icons/edit-white.svg"
              alt="edit icon"
              onClick={() => {
                const image = document
                  .getElementById(`newImageId${defaultValue.id}`)
                  ?.click();
              }}
              style={{ cursor: "pointer" }}
              height={80}
            />
          </div>
        )}

        <input
          type="file"
          className="d-none"
          id={`newImageId${defaultValue.id}`}
          accept="image/*"
          onChange={(e) => {
            if (e?.target?.files?.[0]) setNewDishImage(e?.target?.files?.[0]!);
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
                    readOnly={!editMode}
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
                            readOnly={!editMode}
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
                            readOnly={!editMode}
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
                            readOnly={!editMode}
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
                            readOnly={!editMode}
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
                            readOnly={!editMode}
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
                            readOnly={!editMode}
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
                    readOnly={!editMode}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row style={{ height: "30%" }}>
              <Col className="d-flex">
                <Button
                  variant="danger"
                  className="flex-fill"
                  onClick={() => deleteFunction(defaultValue?.id!)}
                >
                  Delete
                </Button>
              </Col>
              <Col className="d-flex">
                {editMode ? (
                  <Button
                    variant="success"
                    className="flex-fill"
                    onClick={editFunction}
                  >
                    Conform Edit
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    className="flex-fill"
                    onClick={toggleEdit}
                  >
                    Edit
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export { DishInfo };
