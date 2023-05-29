import React, { useEffect, useState } from "react";
import Head from "next/head";
/* import bootstrap */
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
// import type { MODE } from "./index";
import { Dish } from "../../../../../interfaces";
import {
  axiosDeleteFunction,
  axiosPatchFunction,
} from "../../../../../useFullItems/axios";

const TableInput = ({
  editMode,
  defaultValue,
}: {
  editMode: boolean;
  defaultValue?: number;
}) => (
  <InputGroup>
    <InputGroup.Text>₹</InputGroup.Text>
    <FormControl
      type="number"
      readOnly
      // onChange={(e) => console.log(e.target.value)}
      defaultValue={defaultValue}
    />
    {editMode && (
      <InputGroup.Text className="d-none d-sm-flex">
        <img src="/icons/edit.svg" />
      </InputGroup.Text>
    )}
  </InputGroup>
);

interface Props {
  // mode: MODE;
  setMode: (para: undefined) => void;
  dishInfo: Dish;
  showHeader: boolean;
}

export const DishModal = (props: Props) => {
  const { setMode, dishInfo, showHeader } = props;
  const [editMode, setEditMode] = useState(false);
  // const [dishDetail, setDishDetail] = useState(dishInfo);
  // /* items state */
  // const [dishImage, setDishImage] = useState<File>();
  // const [imagePreview, setImagePreview] = useState("/images/burger.webp");
  // const [dishName, setDishName] = useState<string>("");
  // const [largeFull, setLargeFull] = useState<number>();
  // const [largeHale, setLargeHale] = useState<number>();
  // const [mediumFull, setMediumFull] = useState<number>();
  // const [mediumHalf, setMediumHalf] = useState<number>();
  // const [smallFull, setSmallFull] = useState<number>();
  // const [smallHalf, setSmallHalf] = useState<number>();

  // const [description, setDescription] = useState<string>("");
  // const [addOns, setAddons] = useState<{ name: string; price: number }[]>([]);

  const closeModal = () => setMode(undefined);

  const deleteAndCloseModal = async () => {
    await deleteDish();
    closeModal();
  };

  const deleteDish = async () =>
    await axiosDeleteFunction({
      parentUrl: "dishes",
      childUrl: dishInfo.id,
      data: {
        name: dishInfo.name,
      },
    });

  const toggleDishAvailability = () => {
    axiosPatchFunction({
      parentUrl: "dishes",
      data: { available: !dishInfo?.available },
      childUrl: dishInfo?.id,
    });
  };

  return (
    <Modal
      scrollable
      centered
      show={!!dishInfo}
      onHide={closeModal}
      backdrop={showHeader ? "static" : undefined}
    >
      {showHeader && (
        <Modal.Header>
          <Switch
            label="Available"
            onChange={toggleDishAvailability}
            defaultChecked={dishInfo?.available}
          />
          <Button variant="danger" onClick={deleteAndCloseModal}>
            Delete
          </Button>
          {/* {true ? (
          <Button variant="primary">Save</Button>
        ) : (
          <Button onClick={() => setMode("EDIT")}>Edit</Button>
        )} */}
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Header>
      )}
      <Modal.Body className="p-0">
        <Card>
          <div style={{ position: "relative" }}>
            <Card.Img
              variant="top"
              style={{ opacity: false ? "0.5" : 1, objectFit: "cover" }}
              src={dishInfo?.imageUrl || "/images/default_food.jpg"}
              height={300}
            />
            {false && (
              <img
                src="/icons/edit.svg"
                onClick={() => document.getElementById("fileInput")?.click()}
                style={{
                  height: "4rem",
                  position: "absolute",
                  right: "50%",
                  bottom: "50%",
                  transform: "translate(50%,50%)",
                }}
                alt="edit icon"
              />
            )}
            <input
              type="file"
              style={{ display: "none" }}
              name="bigbandimage"
              id="fileInput"
              onChange={(e) => {
                const target = e.target;
                const file = target.files;
                if (file?.length !== undefined) {
                  if (file.length > 0) {
                    if (
                      file[0].size < 100000 &&
                      new RegExp("jpeg|png|jpg|webp").test(file[0].type)
                    )
                      // setDishImage(file[0]);
                      alert("selected");
                    else
                      alert(
                        "Image should be less than 100KB and should be jpeg,png,jpg type"
                      );
                  }
                }
              }}
            />
          </div>
          <Card.Body>
            <Card.Title>
              <InputGroup size="sm">
                <FormControl
                  className="fw-bold fs-5"
                  readOnly={!editMode}
                  defaultValue={dishInfo?.name}
                />
                {editMode && (
                  <InputGroup.Text>
                    <img src="/icons/edit.svg" alt="edit icon" />
                  </InputGroup.Text>
                )}
              </InputGroup>
            </Card.Title>

            <Table striped bordered hover>
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
                    <TableInput
                      editMode={editMode}
                      defaultValue={dishInfo?.price?.large?.full}
                    />
                  </td>
                  <td>
                    <TableInput
                      editMode={editMode}
                      defaultValue={dishInfo?.price?.large?.half}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Medium</th>
                  <td>
                    <TableInput
                      editMode={editMode}
                      defaultValue={dishInfo?.price?.medium?.full}
                    />
                  </td>
                  <td>
                    <TableInput
                      editMode={editMode}
                      defaultValue={dishInfo?.price?.medium?.half}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Small</th>
                  <td>
                    <TableInput
                      editMode={editMode}
                      defaultValue={dishInfo?.price?.small?.full}
                    />
                  </td>
                  <td>
                    <TableInput
                      editMode={editMode}
                      defaultValue={dishInfo?.price?.small?.half}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description :- </InputGroup.Text>
              <FormControl
                defaultValue={dishInfo?.description}
                readOnly={!editMode}
              />
            </InputGroup>

            {/* <ListGroup> */}
            {/* <ListGroup.Item className="p-0"> */}
            {/* <InputGroup>
                <FormControl disabled className="fw-bold" value="Add Ons" />
                <FormControl disabled className="fw-bold" value="Price" />
              </InputGroup>
              {dishInfo?.addOns?.map((value) => (
                <InputGroup key={value.id}>
                  <FormControl readOnly defaultValue={value.name} />
                  <FormControl readOnly defaultValue={`₹ ${value.price}`} />
                </InputGroup>
              ))} */}

            {/* {editMode && <Button>Add addons</Button>} */}
            {/* </ListGroup> */}
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};
