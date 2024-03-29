import { Order, cartToOrder } from "../../../pages/realtime/orders/redux";
// import { Kot } from "../../functions/onLoad/fetchAndStoreFunctions";
import { store, actionTypes } from "../../redux";

export const updateTableStatus = ({
  tableSectionId,
  tableNumber,
  status,
}: {
  tableSectionId: string;
  tableNumber: number;
  status: null | string;
}) => {
  store.dispatch(
    actionTypes.updateTableStatus({
      status,
      tableNumber,
      tableSectionId,
    })
  );
};

export const pushInOrderContainer = (kot: Order[]) => {
  store.dispatch(actionTypes.unshiftInOrderContainer(kot))
}

export const convertCartToOrder = ({
  orderArray,
  orderNo,
}: {
  orderArray: Order[];
  orderNo: number;
}) => {
  store.dispatch(cartToOrder({ orderArray, orderNo }));
};

const orderStatusUpdation = {
  Accept: "Accept",
  Completed: "Completed",
  Remove: "Remove",
};
// export const updateOrderStatus = (payload: {
//   orderId: Kot["id"];
//   orderStatus: keyof typeof orderStatusUpdation;
//   chefId: string;
// }) => {
//   switch (payload.orderStatus) {
//     case "Accept":
//       store.dispatch(
//         actionTypes.orderAccepted({
//           chefId: payload.chefId,
//           orderId: payload.orderId,
//         })
//       );
//       break;

//     case "Completed":
//       store.dispatch(actionTypes.orderCompleted(payload.orderId));
//       break;

//     case "Remove":
//       store.dispatch(actionTypes.orderRemove(payload.orderId));
//       break;

//     default:
//       console.log(payload);
//       break;
//   }
// };
