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
import { useState } from "react";
import Select from "react-select";
import { Dish, Table } from "../interfaces";
import { axiosPostFunction, controllerUrls } from "../useFullItems/axios";
import { StartSessionModal } from "./StartSessionModal";

interface Props {}

function DishOrderModal(props: Props) {
  //   const {} = props;

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
  const [parcelOrder, setParcelOrder] = useState<string>();
  const [dishSize, setDishSize] = useState<keyof Dish["price"]>("large");
  const [fullQuantity, setFullQuantity] = useState<number>(0);
  const [halfQuantity, setHalfQuantity] = useState<number>(0);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedDish, setSelectDish] = useState<Dish>();
  const [userDescription, setUserDescription] = useState("");

  const sessionInfoObj = useAppSelector(
    (store) => store.tableStatus.tableDetail
  );

  const { dishObj } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const dispatch = useAppDispatch();

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

  const submitOrder = () => {
    // check for all
    if (!selectedDish?.price[dishSize])
      return alert(`${dishSize} not available`);

    if (!selectedDish.price[dishSize]?.full) {
      if (fullQuantity) {
        return alert("Full quantity not available");
      }
    }
    if (!selectedDish.price[dishSize]?.half) {
      if (halfQuantity) {
        return alert("Half quantity not available");
      }
    }

    if (!selectedTableNumber) return alert("Please select table number");
    if (!selectedTableId) return alert("Please select table section");

    if (!sessionInfoObj?.[selectedTableId]?.[selectedTableNumber])
      return alert("Please start table session");

    axiosPostFunction({
      parentUrl: controllerUrls.orders,
      loader: true,
      data: {
        dishId: selectedDishId,
        tableSectionId: selectedTableId,
        tableNumber: selectedTableNumber,
        sessionId: sessionInfoObj?.[selectedTableId]?.[selectedTableNumber],
        size: dishSize,
        user_description: userDescription,
        halfQuantity: halfQuantity ? halfQuantity : null,
        fullQuantity: fullQuantity ? fullQuantity : null,
      },
      thenFunction: () => {
        setFullQuantity(0);
        setHalfQuantity(0);
        setUserDescription("");
      },
    });
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

  return (
    <>
      <StartSessionModal
        tableNumber={selectedTableNumber!}
        tableSectionId={selectedTableId}
        handleClose={closeSessionModal}
        show={showSessionModal}
      />
      <Modal
        size="lg"
        show={showOrderModal}
        backdrop="static"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title>Dish Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <Form.Check
                inline
                label="Parcel"
                name="orderType"
                type="radio"
                id="inline-parcel"
                // onClick={}
              />
              <Form.Check
                inline
                label="Order"
                name="orderType"
                type="radio"
                id="inline-order"
                onChange={(e) => console.log(e.target.value)}
              />
            </Col>
          </Row>
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
                onChange={(e) => selectTableNumber(parseInt(e.target.value))}
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
          <Row className="mb-3">
            <Form.Group as={Col} xs={9}>
              <Select
                // value={selectedOption}
                placeholder="Select Dish"
                onChange={(e) => selectDish(e?.value)}
                options={dishesh.map((dish) => ({
                  label: dish.name,
                  value: dish.id,
                }))}
              />
            </Form.Group>
            <Form.Group as={Col} xs={3}>
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
                <option disabled={!selectedDish?.price.medium} value="medium">
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
                onChange={(e) => setFullQuantity(parseInt(e.target.value))}
                type="number"
                min={0}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6}>
              <Form.Label>Half Quantity</Form.Label>
              <Form.Control
                value={String(halfQuantity)}
                disabled={!selectedDish?.price?.[dishSize]?.half}
                onChange={(e) => setHalfQuantity(parseInt(e.target.value))}
                type="number"
                min={0}
              />
            </Form.Group>
          </Row>
          <Row>
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
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitOrder}>Place Order</Button>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { DishOrderModal };
