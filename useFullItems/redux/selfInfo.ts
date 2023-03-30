import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialDataTypes {
  defaultValues: {
    id: string | undefined;
  };
}

const initialState: InitialDataTypes = {
  defaultValues: {
    id: undefined,
  },
};

export const selfInfo = createSlice({
  name: "selfInfo",
  initialState,
  reducers: {
    updateSelfInfo: (
      state,
      action: PayloadAction<InitialDataTypes["defaultValues"]>
    ) => {
      const { id } = action.payload;
      state.defaultValues.id = id;
    },
  },
});

export const { updateSelfInfo } = selfInfo.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default selfInfo.reducer;
