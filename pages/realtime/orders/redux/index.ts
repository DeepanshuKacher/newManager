import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constants } from "../../../../useFullItems/constants";
import { axiosGetFunction } from "../../../../useFullItems/axios";
import { actionTypes, store } from "../../../../useFullItems/redux";

export interface Order {
  dishId: string;
  orderId: string;
  tableNumber: number;
  tableSectionId: string;
  user_description?: string;
  orderedBy: string;
  size: "Large" | "Medium" | "Small";
  fullQuantity?: number;
  halfQuantity?: number;
  chefAssign?: string;
  completed?: string;
  createdAt: string;
}

interface InitialDataTypes {
  orders: Order[];
  noRepeatContainer: { [orderId: Order["orderId"]]: Order };
}

const initialState: InitialDataTypes = {
  orders: [],
  noRepeatContainer: {},
};

const orderContainer = createSlice({
  name: "orderContainer",
  initialState,
  reducers: {
    storeDishOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      for (let x of state.orders) {
        state.noRepeatContainer[x.orderId] = x;
      }
    },
    unshiftInOrderContainer: (
      state,
      action: PayloadAction<{
        order: Order;
        orderNo: number;
      }>
    ) => {
      const { order, orderNo } = action.payload;
      if (state.noRepeatContainer[order.orderId] === undefined)
        state.orders.push(action.payload.order);

      const todaysDate = new Date().getDate();
      const totalTodaysOrder = state.orders.reduce((acc, currentValue) => {
        if (new Date(currentValue.createdAt).getDate() === todaysDate)
          return acc + 1;
        else return acc;
      }, 0);

      if (state.orders.length !== action.payload.orderNo) {
        if (constants.IS_DEVELOPMENT) {
          console.log("loading mqtt data again");
        }

        // axiosGetFunction({
        //   parentUrl: "orders",
        //   thenFunction: (data: Order[]) =>
        //     store.dispatch(actionTypes.storeDishOrders(data)),
        // });
      }
    },
    cartToOrder: (
      state,
      action: PayloadAction<{
        orderArray: Order[];
        orderNo: number;
      }>
    ) => {
      const { orderArray, orderNo } = action.payload;
      const newOrderArray = orderArray.filter(
        (order) => state.noRepeatContainer[order.orderId] === undefined
      );
      state.orders.push(...newOrderArray);
    },
    orderAccepted: (
      state,
      action: PayloadAction<{
        chefId: string;
        orderId: string;
      }>
    ) => {
      const orders = [...state.orders];
      const selectedOrder = orders.findIndex(
        (item) => item.orderId === action.payload.orderId
      );

      orders[selectedOrder].chefAssign = action.payload.chefId;

      state.orders = orders;
    },
    orderCompleted: (state, action: PayloadAction<Order["orderId"]>) => {
      const orders = [...state.orders];
      const selectedOrder = orders.findIndex(
        (item) => item.orderId === action.payload
      );

      orders[selectedOrder].completed = "Completed";

      state.orders = orders;
    },
    orderRemove: (state, action: PayloadAction<Order["orderId"]>) => {
      const orders = [...state.orders];
      const selectedOrder = orders.findIndex(
        (item) => item.orderId === action.payload
      );

      orders[selectedOrder].chefAssign = undefined;

      state.orders = orders;
    },
  },
});

export const {
  unshiftInOrderContainer,
  storeDishOrders,
  cartToOrder,
  orderAccepted,
  orderCompleted,
  orderRemove,
} = orderContainer.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default orderContainer.reducer;
