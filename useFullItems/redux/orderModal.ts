import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  showOrderModal: boolean;
}

const initialState: InitialState = {
  showOrderModal: false,
};

export const orderModal = createSlice({
  name: "orderModal",
  initialState,
  reducers: {
    changeOrderModalShowState: (
      state,
      action: PayloadAction<(typeof initialState)["showOrderModal"]>
    ) => {
      state.showOrderModal = action?.payload;
    },
  },
});

export const { changeOrderModalShowState } = orderModal.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default orderModal.reducer;
