import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DishesSlice {
  value: {
    sectionName: string;
    id: string;
  };
}

const initialState: DishesSlice = {
  value: {
    id: "",
    sectionName: "",
  },
};

export type DishesSliceType = typeof initialState.value;

export const dishesSlice = createSlice({
  name: "restaurantInfo",
  initialState,
  reducers: {
    updateSectionInfo: (state, action: PayloadAction<DishesSliceType>) => {
      state.value = action.payload;
    },
  },
});

export const { updateSectionInfo } = dishesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default dishesSlice.reducer;
