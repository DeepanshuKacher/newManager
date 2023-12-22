import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  useAppSelector,
  useAppDispatch,
  actionTypes,
} from "../useFullItems/redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { default as BootstrapTable } from "react-bootstrap/Table";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Dish, Table } from "../interfaces";
import { axiosPostFunction, controllerUrls } from "../useFullItems/axios";
import { StartSessionModal } from "./StartSessionModal";
import styles from "../styles/Custom.module.css";
import { Order } from "../pages/realtime/orders/redux";
import Spinner from "react-bootstrap/Spinner";
import { constants } from "../useFullItems/constants";
import { TemplateToPrint } from "./pagesComponents/customize_restaurant/template/TemplateToPrint";
import ReactToPrint from "react-to-print";

interface Props {}

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

function DishOrderModal(props: Props) {
  //   const {} = props;

  const dispatch = useAppDispatch();
  const { showOrderModal } = useAppSelector((store) => store.orderModal);
  const { tables, dishesh } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );
  const [tableNumbers, setTableNumbers] = useState<number[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<string>(
    "Select Table Section"
  );
  const [seletedTablePrefix, setSeletedTablePrefix] = useState("");
  const [seletedTableSuffix, setSeletedTableSuffix] = useState("");
  // const [seletedTable, setSelectedTable] = useState<Table>();
  const [selectedTableNumber, setSelectedTableNumber] = useState<number>();
  const [selectedDishId, setSeletedDishId] = useState<string>();
  const [parcelOrder, setParcelOrder] = useState<"parcel" | "order">("parcel"); // make it global
  const [dishSize, setDishSize] = useState<keyof Dish["price"]>("large");
  const [fullQuantity, setFullQuantity] = useState<number>(0);
  const [halfQuantity, setHalfQuantity] = useState<number>(0);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedDish, setSelectDish] = useState<Dish>();
  const [userDescription, setUserDescription] = useState("");
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [usingDishCodeSystem, setUsingDishCodeSystem] = useState(false);
  const [kotNumber, setKotNumber] = useState();
  const [orderItem, setOrderItem] = useState<
    {
      dishId: string;
      size: Order["size"];
      fullQuantity?: number;
      halfQuantity?: number;
      user_description?: string;
      key: number;
    }[]
  >([]);

  const printComponentRef = useRef<any>();

  const sessionInfoObj = useAppSelector(
    (store) => store.tableStatus.tableDetail
  );

  const { dishObj } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const { operationsArray, upperMarkDown } = useAppSelector(
    (store) => store.billingTamplate
  );

  useEffect(() => {
    if (kotNumber) {
      document.getElementById("printBillParcelButtonId")?.click();
    }
  }, [kotNumber]);

  const closeModal = () =>
    dispatch(actionTypes.changeOrderModalShowState(false));

  const onSelectTableSection = (tableSectionId: string) => {
    const selectedTable = tables.find((table) => table.id === tableSectionId);

    if (!selectedTable) return alert("Please select table");

    setSelectedTableId(selectedTable.id);

    if (selectedTable.prefix) setSeletedTablePrefix(selectedTable.prefix);
    else setSeletedTablePrefix("");
    if (selectedTable.suffix) setSeletedTableSuffix(selectedTable.suffix);
    else setSeletedTableSuffix("");

    const tempStoreArray: number[] = [];

    for (let i = selectedTable.startNumber; i <= selectedTable.endNumber; i++)
      tempStoreArray.push(i);

    setTableNumbers(tempStoreArray);
  };

  const selectTableNumber = (tableNumber: number) => {
    setSelectedTableNumber(tableNumber);

    const sessionId = sessionInfoObj?.[selectedTableId]?.[tableNumber];

    // console.log({ sessionId });

    if (!sessionId) {
      setShowSessionModal(true);
      // setSelectedTableSessionId(sessionId);
    }
  };

  const closeSessionModal = () => {
    setShowSessionModal(false);
  };

  const selectDish = (dishId?: string) => {
    if (!dishId) return alert("Please Select Dish");
    const dish = dishObj[dishId];
    setSelectDish(dish);
    setSeletedDishId(dishId);
    setFullQuantity(0);
    setHalfQuantity(0);
  };

  const reset = () => {
    setFullQuantity(0);
    setHalfQuantity(0);
    setUserDescription("");

    const htmlInputElement: any = document.getElementById("enterDishCode");
    if (htmlInputElement) htmlInputElement.value = "";
  };

  const addDish = () => {
    if (!selectedDishId) return alert("Please Select Dish");
    if (!(fullQuantity || halfQuantity)) return alert("Please Select Quantity");
    if (parcelOrder === "parcel") {
      // setOrderItem((currentValue) => [
      //   ...currentValue,
      //   {
      //     dishId: selectedDishId,
      //     size: dishSize,
      //     fullQuantity: fullQuantity,
      //     halfQuantity: halfQuantity,
      //     user_description: userDescription,
      //     key: Math.round(Math.random() * 1000000),
      //   },
      // ]);

      reset();
    }
  };

  const removeDish = (itemKey: number) => {
    const items = orderItem.filter((item) => item.key !== itemKey);
    setOrderItem(items);
  };

  const placeOrder = () => {
    setPlaceOrderLoading(true);

    if (orderItem.length === 0) return alert("No Item Selected");

    axiosPostFunction({
      parentUrl: controllerUrls.parcel,
      data: {
        kotOrders: orderItem.map((item) => ({
          dishId: item.dishId,
          size: item.size,
          fullQuantity: item.fullQuantity ? item.fullQuantity : null,
          halfQuantity: item.halfQuantity ? item.halfQuantity : null,
          user_description: item.user_description,
        })),
      },
      thenFunction: (response: any) => {
        console.log({ response });

        setKotNumber(response.kotNumber);

        // setOrderItem([]);
        // reset();
        setPlaceOrderLoading(false);
      },
    });
  };

  const dishCodeFindDish = (e: ChangeEvent<FormControlElement>) => {
    if (e?.target?.value) {
      const code = parseInt(e.target.value);

      const selectedDishDetail = dishesh.find(
        (dish) => dish?.dishCode === code
      );

      if (selectedDishDetail?.id) selectDish(selectedDishDetail?.id);
    }
  };

  return (
    <>
      <StartSessionModal
        tableNumber={selectedTableNumber!}
        tableSectionId={selectedTableId}
        handleClose={closeSessionModal}
        show={showSessionModal}
      />
      <ReactToPrint
        content={() => printComponentRef.current}
        trigger={() => (
          <button style={{ display: "none" }} id="printBillParcelButtonId">
            Print Bill
          </button>
        )}
        onAfterPrint={() => {
          reset();
          setOrderItem([]);
        }}
      />
      <Modal
        // size="lg"
        show={showOrderModal}
        backdrop="static"
        aria-labelledby="example-modal-sizes-title-lg"
        dialogClassName={styles.modelWidth}
        // style={{ width: "80rem" }}
      >
        <div
          style={{
            backgroundColor: constants.transparentBackgroundColor,
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 1,
            display: placeOrderLoading ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner variant="light" />
        </div>
        <Modal.Header>
          <Modal.Title>Dish Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={6}>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    inline
                    label="Parcel"
                    name="orderType"
                    type="radio"
                    id="inline-parcel"
                    defaultChecked={true}
                    onClick={() => setParcelOrder("parcel")}
                  />
                  <Form.Check
                    inline
                    label="Order"
                    name="orderType"
                    type="radio"
                    id="inline-order"
                    onClick={() => setParcelOrder("order")}
                  />
                  <Form.Check
                    inline
                    label="Dish Code System"
                    name="dishCodeSystem"
                    type="checkbox"
                    id="dishCodeSystemId"
                    checked={usingDishCodeSystem}
                    onChange={() =>
                      setUsingDishCodeSystem((current) => !current)
                    }
                  />
                </Col>
              </Row>
              {parcelOrder === "order" ? (
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    {/* <Form.Label>Table Section</Form.Label> */}
                    <Form.Select
                      value={selectedTableId}
                      // defaultValue="Select Table Section"
                      onChange={(e) => onSelectTableSection(e.target.value)}
                    >
                      <option disabled value="Select Table Section">
                        Select Table Section
                      </option>
                      {tables?.map((table) => (
                        <option key={table.id} value={table.id}>
                          {table.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Select
                      // defaultValue="Select Table Number"
                      value={selectedTableNumber}
                      onChange={(e) =>
                        selectTableNumber(parseInt(e.target.value))
                      }
                    >
                      {/* <option value="Select Table Number">Select Table Number</option> */}
                      {tableNumbers.map((tNumber) => (
                        <option key={tNumber} value={tNumber}>
                          {`${seletedTablePrefix}${tNumber}${seletedTableSuffix}`}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              ) : null}
              <Row className="mb-3">
                <Form.Group as={Col} xs={8}>
                  <Select
                    value={{ label: selectedDish?.name, value: selectedDishId }}
                    placeholder="Select Dish"
                    onChange={(e) => selectDish(e?.value)}
                    options={dishesh?.map((dish) => ({
                      label: dish.name,
                      value: dish.id,
                    }))}
                  />
                </Form.Group>
                <Form.Group as={Col} xs={2}>
                  {/* <Form.Label>Dish Code</Form.Label> */}
                  <Form.Control
                    // disabled={!selectedDish?.price?.[dishSize]?.full}
                    // value={String(fullQuantity)}
                    type="number"
                    placeholder="enter dish code"
                    onChange={dishCodeFindDish}
                    id="enterDishCode"
                    // min={0}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={2}>
                  <Form.Select
                    // defaultValue="Select Size"
                    value={dishSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "large" ||
                        value === "medium" ||
                        value === "small"
                      )
                        setDishSize(value);
                    }}
                  >
                    <option disabled value="Select Size">
                      Select Size
                    </option>
                    <option disabled={!selectedDish?.price.large} value="large">
                      Large
                    </option>
                    <option
                      disabled={!selectedDish?.price.medium}
                      value="medium"
                    >
                      Medium
                    </option>
                    <option disabled={!selectedDish?.price.small} value="small">
                      Small
                    </option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} xs={6}>
                  <Form.Label>Full Quantity</Form.Label>
                  <Form.Control
                    disabled={!selectedDish?.price?.[dishSize]?.full}
                    value={String(fullQuantity)}
                    onChange={(e) => {
                      if (e.target.value) {
                        setFullQuantity(parseInt(e.target.value));
                      } else {
                        setFullQuantity(0);
                      }
                    }}
                    type="number"
                    min={0}
                  />
                </Form.Group>
                <Form.Group as={Col} xs={6}>
                  <Form.Label>Half Quantity</Form.Label>
                  <Form.Control
                    value={String(halfQuantity)}
                    disabled={!selectedDish?.price?.[dishSize]?.half}
                    onChange={(e) => {
                      if (e.target.value) {
                        setHalfQuantity(parseInt(e.target.value));
                      } else {
                        setHalfQuantity(0);
                      }
                    }}
                    type="number"
                    min={0}
                  />
                </Form.Group>
              </Row>
              {/* <Row> */}
              <Form.FloatingLabel
                controlId="userDescriptionOrder"
                label=" user description"
                // className="ms-3"
              >
                <Form.Control
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  type="text"
                  placeholder="user description"
                />
              </Form.FloatingLabel>
              {/* </Row> */}
              <Row className="mt-3">
                <Col>
                  <Button
                    onClick={addDish}
                    style={{ width: "100%" }}
                    variant="success"
                  >
                    Add Dish
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={reset}
                    style={{ width: "100%" }}
                    variant="danger"
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={6}>
              <Row>
                <BootstrapTable striped bordered hover>
                  <tbody>
                    {orderItem.map((item) => {
                      return (
                        <tr key={item.key}>
                          <td>
                            {dishObj[item.dishId].name} -{" "}
                            {dishSize[0].toLocaleUpperCase()}
                          </td>
                          <td>
                            {item.fullQuantity && item.halfQuantity
                              ? `F-${item.fullQuantity} H-${item.halfQuantity}`
                              : item.fullQuantity
                              ? `F-${item.fullQuantity}`
                              : `H-${item.halfQuantity}`}
                          </td>
                          <td onClick={() => removeDish(item.key)}>
                            <img
                              src="/icons/delete.svg"
                              alt="delete icon"
                              width={25}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </BootstrapTable>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={placeOrder}>Place Order</Button>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { DishOrderModal };
