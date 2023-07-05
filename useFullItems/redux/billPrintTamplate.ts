import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum OperationType {
  Plus = "Plus",
  Minus = "Minus",
  Multiply = "Multiply",
  Divide = "Divide",
  Percentage = "Percentage",
}

enum GainLoss {
  gain = "gain",
  loss = "loss",
}

export type Operations = {
  label: string;
  number: number;
  operation: OperationType;
  gainLoss: GainLoss;
};

export interface InitialDataTypes {
  upperMarkDown?: string;
  operationsArray?: Operations[];
}

const initialState: InitialDataTypes = {
  operationsArray: [],
  upperMarkDown: "",
};

const billingTemplateSlice = createSlice({
  name: "billingTemplate",
  initialState,
  reducers: {
    updatePrintTemplateUpperMarkdown: (
      state,
      action: PayloadAction<string>
    ) => {
      state.upperMarkDown = action.payload;
    },
    updateOperationArray: (state, action: PayloadAction<Operations[]>) => {
      state.operationsArray = action.payload;
    },
  },
});

export const { updateOperationArray, updatePrintTemplateUpperMarkdown } =
  billingTemplateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default billingTemplateSlice.reducer;
