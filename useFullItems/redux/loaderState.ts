import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loaderState = createSlice({
  name: "loaderState",
  initialState: {
    values: false,
  },
  reducers: {
    updateLoaderState: (state, action: PayloadAction<boolean>) => {
      state.values = action.payload;
    },
  },
});

export const { updateLoaderState } = loaderState.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default loaderState.reducer;
