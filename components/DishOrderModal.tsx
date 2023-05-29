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
import { Table } from "../interfaces";
import { axiosPostFunction, controllerUrls } from "../useFullItems/axios";

interface Props {}

function DishOrderModal(props: Props) {
  //   const {} = props;

  const { showOrderModal } = useAppSelector((store) => store.orderModal);
  const { tables, dishesh } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );
  const [tableNumbers, setTableNumbers] = useState<number[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<string>("");
  const [seletedTablePrefix, setSeletedTablePrefix] = useState("");
  const [seletedTableSuffix, setSeletedTableSuffix] = useState("");
  // const [seletedTable, setSelectedTable] = useState<Table>();
  const [selectedTableNumber, setSelectedTableNumber] = useState<number>();
  const [selectedDishId, setSeletedDishId] = useState<string>();
  const [parcelOrder, setParcelOrder] = useState<string>();
  const [dishSize, setDishSize] = useState("Large");
  const [fullQuantity, setFullQuantity] = useState<number>();
  const [halfQuantity, setHalfQuantity] = useState<number>();

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

    axiosPostFunction({
      parentUrl: controllerUrls.orders,
      loader: true,
      data: {
        dishId: selectedDishId,
        tableSectionId: selectedTableId,
        tableNumber: selectedTableNumber,
      },
    });
  };

  return (
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
              defaultValue="Select Table Section"
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
              defaultValue="Select Table Number"
              onChange={(e) => setSelectedTableNumber(parseInt(e.target.value))}
            >
              <option disabled value="Select Table Number">
                Select Table Number
              </option>
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
              onChange={(e) => setSeletedDishId(e?.value)}
              options={dishesh.map((dish) => ({
                label: dish.name,
                value: dish.id,
              }))}
            />
          </Form.Group>
          <Form.Group as={Col} xs={3}>
            <Form.Select onChange={(e) => setDishSize(e.target.value)}>
              <option value="Large">Large</option>
              <option value="Medium">Medium</option>
              <option value="Small">Small</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} xs={6}>
            <Form.Label>Full Quantity</Form.Label>
            <Form.Control
              onChange={(e) => setFullQuantity(parseInt(e.target.value))}
              type="number"
            />
          </Form.Group>
          <Form.Group as={Col} xs={6}>
            <Form.Label>Half Quantity</Form.Label>
            <Form.Control
              onChange={(e) => setHalfQuantity(parseInt(e.target.value))}
              type="number"
            />
          </Form.Group>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitOrder}>Place Order</Button>
        <Button variant="danger" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { DishOrderModal };
