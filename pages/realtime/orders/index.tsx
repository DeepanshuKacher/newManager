import React from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { useAppSelector } from "../../../useFullItems/redux";
import { OrderDetailModal } from "../../../components/pagesComponents/realtime/orders/DetailModal";
import { Order } from "./redux";

function Orders() {
  const [orderDetailModal, setOrderDetailModal] = useState<null | Order>(null);

  const restaurantDetail = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const { dishesh: disheshData, waiters, tables } = restaurantDetail;

  const orders = useAppSelector((store) => store.orderContainer.orders);

  const toggleOrderDetailModal = () => setOrderDetailModal(null);

  return (
    <>
      {orderDetailModal && (
        <OrderDetailModal
          orderDetail={orderDetailModal}
          toggleOrderDetailModal={toggleOrderDetailModal}
        />
      )}
      <Table striped responsive hover>
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Food</th>
            <th scope="col">Table No.</th>
            <th scope="col">Ordered by</th>
            <th scope="col">Chef Assign</th>
            {/* This is optional for small restro Chef Assignks */}
            <th scope="col">Waiter Assign</th>
            {/* This is optional for self-service restro waiter Assign */}
            <th scope="col">
              View
              {/* /Edit */}
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => {
            // console.log(item.orderId);
            const tableSection = tables.find(
              (table) => table.id === item.tableSectionId
            );
            return (
              <tr key={index}>
                {/* key will be orderId */}
                <th scope="row">{index + 1}</th>
                <td>
                  {disheshData.find((dish) => dish.id === item.dishId)?.name}
                </td>
                <td>
                  {tableSection?.prefix}
                  {item.tableNumber}
                  {tableSection?.suffix}
                </td>
                <td>
                  {waiters.find((waiter) => waiter.id === item.orderedBy)
                    ?.name || "self"}
                </td>
                <td>chef Assign</td>
                <td>waiter assign</td>
                <td
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setOrderDetailModal(item)}
                >
                  <img src="/icons/edit.svg" alt="edit icon" />
                  {/* <Image fluid src="/icons/edit.svg" /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Orders;
