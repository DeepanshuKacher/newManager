import React, { useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { useAppSelector } from "../../../useFullItems/redux";
import { OrderDetailModal } from "../../../components/pagesComponents/realtime/orders/DetailModal";
import { Order } from "./redux";

function Orders() {
  const [orderDetailModal, setOrderDetailModal] = useState<null | Order>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const {
    dishesh: disheshData,
    waiters,
    tables,
    chefs,
  } = useAppSelector((store) => store.restaurantInfo.defaultValues);

  const orders = useAppSelector((store) => store.orderContainer.orders);

  useEffect(() => {
    if (checkBottomScroll()) messageEndRef.current?.scrollIntoView();
  }, [orders]);

  const checkBottomScroll = () => {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    // When the user is [modifier]px from the bottom, fire the event.
    let modifier = 200;
    if (currentScroll + modifier > documentHeight) return true;
  };

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
            <th scope="col">Order Time</th>
            <th scope="col">Food</th>
            <th scope="col">Table No.</th>
            <th scope="col">Ordered by</th>
            <th scope="col">Chef Assign</th>
            {/* This is optional for small restro Chef Assignks */}
            {/* <th scope="col">Waiter Assign</th> */}
            {/* This is optional for self-service restro waiter Assign */}
            <th scope="col">
              View
              {/* /Edit */}
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item: Order | undefined, index) => {
            const tableSection = tables.find(
              (table) => table.id === item?.tableSectionId
            );
            return (
              <tr
                className={`${
                  item?.chefAssign && item?.completed
                    ? ""
                    : item?.chefAssign
                    ? "bg-success"
                    : "bg-warning"
                }`}
                key={item?.orderId}
              >
                <th scope="row">{index + 1}</th>
                <td>{new Date(item?.createdAt || "").toLocaleTimeString()}</td>
                <td>
                  {disheshData.find((dish) => dish.id === item?.dishId)?.name}
                </td>
                <td>
                  {tableSection?.prefix}
                  {item?.tableNumber}
                  {tableSection?.suffix}
                </td>
                <td>
                  {waiters.find((waiter) => waiter.id === item?.orderedBy)
                    ?.name || "self"}
                </td>
                <td>
                  {chefs.find((chef) => chef.id === item?.chefAssign)?.name ||
                    ""}
                </td>
                {/* <td>waiter assign</td> */}
                <td
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setOrderDetailModal(item || null)}
                >
                  <img src="/icons/edit.svg" alt="edit icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div ref={messageEndRef} />
    </>
  );
}

export default Orders;
