import { Order, cartToOrder } from "../../../pages/realtime/orders/redux";
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

export const pushInOrderContainer = (orderDetail: Order) =>
  store.dispatch(actionTypes.unshiftInOrderContainer(orderDetail));

export const convertCartToOrder = (orders: Order[]) => {
  store.dispatch(cartToOrder(orders));
};
