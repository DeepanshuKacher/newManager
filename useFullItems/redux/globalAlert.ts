import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  title: string;
  text: string;
  varient: "success" | "danger" | "warning" | "info" | "primary";
}

const initialState: InitialState = {
  text: "",
  title: "",
  varient: "primary",
};

export const globalAlert = createSlice({
  name: "globalAlert",
  initialState,
  reducers: {
    updateAlertInfo: (state, action: PayloadAction<typeof initialState>) => {
      state = action.payload;
    },
    resetAlert: (state) => {
      state.text = "";
      state.title = "";
      state.varient = "primary";
    },
  },
});

export const { updateAlertInfo, resetAlert } = globalAlert.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default globalAlert.reducer;
