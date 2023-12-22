import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

// import { SessionLog } from "../../../interfaces";
import { useAppSelector } from "../../../useFullItems/redux";
import { useEffect, useRef, useState } from "react";
import { axiosGetFunction } from "../../../useFullItems/axios";
import { calculatePrice, formatDate } from "../../../useFullItems/functions";
import { Order } from "../../realtime/orders/redux";
import { ComponentToPrint } from "../../../components/pagesComponents/logs/order_logs/KotTemplate";
import ReactToPrint from "react-to-print";
import { RetreveKotJson } from "../../../interfaces";
import dateFormatter from "dayjs";



interface OrderModalProps {
  modalData: RetreveKotJson[]
  closeModal: () => void
}

const OrderModal = (props: OrderModalProps) => {
  const { modalData, closeModal } = props;
  const { createdAt, tableNumber, tableSectionId, kotCount, printCount } = modalData[0].value;

  const { dishObj, tables } = useAppSelector(store => store.restaurantInfo.defaultValues);

  const tableInfo = tables.find(item => item.id === tableSectionId)
  return (
    <Modal show={true} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Creation Date: {formatDate(createdAt)}</h6>
        <h6>Table Number: {tableInfo?.prefix}{tableNumber}{tableInfo?.suffix}</h6>
        <h6>KOT Count: {kotCount}</h6>
        <h6>Print Count: {printCount}</h6>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Size</th>
              <th>Full Quantity</th>
              <th>Half Quantity</th>
            </tr>
          </thead>
          <tbody>
            {modalData.map((item, idx) => (
              <tr key={idx}>
                <td>{dishObj[item.value.dishId].name}</td>
                <td>{item.value.size}</td>
                <td>{item.value.fullQuantity}</td>
                <td>{item.value.halfQuantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary">
          Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};



function OrderLogs() {
  const [kot, setKot] = useState<RetreveKotJson[][]>([]);
  const [modalData, setModalData] = useState<RetreveKotJson[]>([]);

  const { tables } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  useEffect(() => {
    getKots();
  }, []);


  //function

  const handleDetailClick = (group: RetreveKotJson[]) => {
    setModalData(group);
  };

  const closeModal = () => {
    setModalData([]);
  };


  const getKots = () => {
    axiosGetFunction({
      parentUrl: "orders",
      // childUrl: "logs",
      thenFunction: (data: RetreveKotJson[]) => {
        const groupedByKot: RetreveKotJson[][] = [];

        data.forEach((order) => {
          const kotId = order.value.kotId;
          const index = groupedByKot.findIndex((group) => group[0].value.kotId === kotId);
          if (index === -1) {
            groupedByKot.push([order]);
          } else {
            groupedByKot[index].push(order);
          }
        });

        setKot(groupedByKot)
      },
      useGlobalLoader: true,
    });
  };

  return (
    <>
      {modalData.length > 0 ? <OrderModal closeModal={closeModal} modalData={modalData} /> : null}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Table No.</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {kot.map((group) => {
            const tableInfo = tables.find(item => item.id === group[0].value.tableSectionId)
            return (
              <tr key={group[0]?.id} className={parseInt(group[0].value.printCount) === 0 ? 'table-danger' : ''}>
                <td>{dateFormatter(parseInt(group[0].value.createdAt)).format("DD/MM, h:mm A")}</td>
                <td>{tableInfo?.prefix}{group[0].value.tableNumber}{tableInfo?.suffix}</td>
                <td>
                  <Button variant="primary" onClick={() => handleDetailClick(group)}>{`Detail`}</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default OrderLogs;
