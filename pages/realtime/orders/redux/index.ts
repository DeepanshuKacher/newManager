import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  dishId: string;
  orderId: string;
  tableNumber: number;
  tableSectionId: string;
  user_description?: string;
  orderedBy: string;
  size: "large" | "medium" | "small";
  fullQuantity?: string;
  halfQuantity?: string;
  chefAssign?: string;
  completed?: string;
  createdAt: string;
}

interface InitialDataTypes {
  orders: Order[];
  noRepeatContainer: { [orderId: Order["orderId"]]: Order };
  totalTodayOrder: number;
}

const initialState: InitialDataTypes = {
  orders: [],
  noRepeatContainer: {},
  totalTodayOrder: 0,
};

const orderContainer = createSlice({
  name: "orderContainer",
  initialState,
  reducers: {
    storeDishOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      for (let x of state?.orders) {
        state.noRepeatContainer[x.orderId] = x;
      }

      const todaysDate = new Date().getDate();

      state.totalTodayOrder = state.orders.reduce((acc, currentValue) => {
        if (new Date(currentValue.createdAt).getDate() === todaysDate)
          return acc + 1;
        else return acc;
      }, 0);
    },
    unshiftInOrderContainer: (
      state,
      action: PayloadAction<{
        order: Order;
        orderNo: number;
      }>
    ) => {
      const { order, orderNo } = action.payload;
      if (state.noRepeatContainer[order.orderId] === undefined) {
        state.orders.push(order);
        state.totalTodayOrder++;
      }

      if (state.totalTodayOrder !== orderNo) {
        alert("Please reload for fresh content");
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

      state.totalTodayOrder += newOrderArray.length;

      if (state.totalTodayOrder !== orderNo) {
        alert("Please reload for fresh content");
      }
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
