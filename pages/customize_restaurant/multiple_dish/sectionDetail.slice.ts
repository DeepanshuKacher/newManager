import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  dishSectionName: string;
  dishSectionId: string;
}

const initialState: InitialState = {
  dishSectionId: "",
  dishSectionName: "",
};

export const addDishToSection = createSlice({
  name: "globalAlert",
  initialState,
  reducers: {
    sectionDetail: (state, action: PayloadAction<typeof initialState>) => {
      state = action.payload;
    },
    resetSectionDetail: (state) => {
      state.dishSectionId = "";
      state.dishSectionName = "";
    },
  },
});

export const { sectionDetail, resetSectionDetail } = addDishToSection.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default addDishToSection.reducer;
