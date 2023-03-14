import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: InitialDataTypes = {
  orders: [],
};

const orderContainer = createSlice({
  name: "orderContainer",
  initialState,
  reducers: {
    storeDishOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    unshiftInOrderContainer: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    cartToOrder: (state, action: PayloadAction<Order[]>) => {
      state.orders.push(...action.payload);
    },
  },
});

export const { unshiftInOrderContainer, storeDishOrders, cartToOrder } =
  orderContainer.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default orderContainer.reducer;
