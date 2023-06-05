import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Dish {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  // addOns: { id: string; name: string; price: number; dishId: string }[];
  available: boolean;
  price: {
    large?: {
      half?: number;
      full?: number;
    };
    medium?: { half?: number; full?: number };
    small?: { half?: number; full?: number };
  };
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

export interface InitialDataTypes {
  defaultValues: {
    name: string;
    city: string;
    id: string;
    tables: Table[];
    waiters: Waiter[];
    dishesh: Dish[];
    chefs: Chef[];
    settings: { allowWaiterToClearSession: boolean };
    dishObj: { [x: string]: Dish };
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
    settings: { allowWaiterToClearSession: false },
    dishObj: {},
  },
};

export type WaiterType = (typeof initialState.defaultValues.waiters)[0];

export type RestaurantSliceType = typeof initialState.defaultValues;

const restaurantInfoSlice = createSlice({
  name: "restaurantInfo",
  initialState,
  reducers: {
    updateRestaurantInfo: (
      state,
      action: PayloadAction<RestaurantSliceType>
    ) => {
      state.defaultValues = action.payload;

      const tempStore: InitialDataTypes["defaultValues"]["dishObj"] = {};

      for (const x of state?.defaultValues?.dishesh || []) {
        tempStore[x.id] = x;
      }

      state.defaultValues.dishObj = tempStore;
    },
  },
});

export const { updateRestaurantInfo } = restaurantInfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default restaurantInfoSlice.reducer;
