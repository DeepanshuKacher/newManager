import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DishesSliceType } from "../../../interfaces";
import type { RootState } from "../store";

export interface Dish {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  // addOns: { id: string; name: string; price: number; dishId: string }[];
  FullLarge_Price: number;
  FullMedium_Price: number;
  FullSmall_Price: number;
  HalfLarge_Price: number;
  HalfMedium_Price: number;
  HalfSmall_Price: number;
  available: boolean;
}
export interface Table {
  id: string;
  name: string;
  prefix?: string;
  suffix?: string;
  startNumber: number;
  endNumber: number;
}

interface Waiter {
  id: string;
  name: string;
  passportPhoto?: string;
  MobileNumber?: number;
  verified: boolean;
  available: boolean;
}

interface Chef {
  id: string;
  name: string;
  passportPhoto?: string;
  MobileNumber?: number;
  verified: boolean;
  available: boolean;
}

interface InitialDataTypes {
  defaultValues: {
    name: string;
    city: string;
    id: string;
    tables: Table[];
    waiters: Waiter[];
    dishesh: Dish[];
    chefs: Chef[];
  };
}

const initialState: InitialDataTypes = {
  defaultValues: {
    name: "",
    city: "",
    id: "",
    tables: [],
    waiters: [],
    dishesh: [],
    chefs: [],
  },
};

export type WaiterType = typeof initialState.defaultValues.waiters[0];

export type RestaurantSliceType = typeof initialState.defaultValues;

export const restaurantInfoSlice = createSlice({
  name: "restaurantInfo",
  initialState,
  reducers: {
    updateRestaurantInfo: (
      state,
      action: PayloadAction<RestaurantSliceType>
    ) => {
      state.defaultValues = action.payload;
    },
  },
});

export const { updateRestaurantInfo } = restaurantInfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default restaurantInfoSlice.reducer;
