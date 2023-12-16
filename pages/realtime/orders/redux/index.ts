import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Kot } from "../../../../useFullItems/functions/onLoad/fetchAndStoreFunctions";

enum Size {
  Large = "large",
  Medium = "medium",
  Small = "small",
}

interface CartItem {
  dishId: string;
  orderId: string;
  tableNumber: number;
  tableSectionId: string;
  user_description?: string;
  orderedBy: string;
  size: Size;
  fullQuantity: number;
  halfQuantity: number;
  chefAssign?: string;
  completed?: string;
  createdAt: number;
  sessionId: string;
  restaurantId: string;
}
export interface Order extends CartItem {
  kotId: string;
}

interface InitialDataTypes {
  orders: Kot[];
  // noRepeatContainer: { [orderId: Order["orderId"]]: Order };
  // totalTodayOrder: number;
}

const initialState: InitialDataTypes = {
  orders: [],
  // noRepeatContainer: {},
  // totalTodayOrder: 0,
};

const orderContainer = createSlice({
  name: "orderContainer",
  initialState,
  reducers: {
    storeDishOrders: (state, action: PayloadAction<Kot[]>) => {
      state.orders = action.payload;
      // for (let x of state?.orders) {
      //   state.noRepeatContainer[x.orderId] = x;
      // }

      // const todaysDate = new Date().getDate();

      // state.totalTodayOrder = state.orders.reduce((acc, currentValue) => {
      //   if (new Date(currentValue.createdAt).getDate() === todaysDate)
      //     return acc + 1;
      //   else return acc;
      // }, 0);
    },
    unshiftInOrderContainer: (state, action: PayloadAction<Kot>) => {
      // const { order, orderNo } = action.payload;
      // if (state.noRepeatContainer[order.orderId] === undefined) {
      //   state.orders.push(order);
      //   state.totalTodayOrder++;
      // }
      // if (state.totalTodayOrder !== orderNo) {
      //   alert("Please reload for fresh content");
      // }
      state.orders.push(action.payload);
    },
    cartToOrder: (
      state,
      action: PayloadAction<{
        orderArray: Order[];
        orderNo: number;
      }>
    ) => {
      // const { orderArray, orderNo } = action.payload;
      // const newOrderArray = orderArray.filter(
      //   (order) => state.noRepeatContainer[order.orderId] === undefined
      // );
      // state.orders.push(...newOrderArray);
      // state.totalTodayOrder += newOrderArray.length;
      // if (state.totalTodayOrder !== orderNo) {
      //   alert("Please reload for fresh content");
      // }
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
        (item) => item.id === action.payload.orderId
      );

      orders[selectedOrder].value.chefAssign = action.payload.chefId;

      state.orders = orders;
    },
    orderCompleted: (state, action: PayloadAction<Kot["id"]>) => {
      const orders = [...state.orders];
      const selectedOrder = orders.findIndex(
        (item) => item.id === action.payload
      );

      orders[selectedOrder].value.completed = 1;

      state.orders = orders;
    },
    orderRemove: (state, action: PayloadAction<Order["orderId"]>) => {
      const orders = [...state.orders];
      const selectedOrder = orders.findIndex(
        (item) => item.id === action.payload
      );

      orders[selectedOrder].value.chefAssign = "";

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
