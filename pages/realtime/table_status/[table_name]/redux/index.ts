import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableNumberDetail {
  tableSectionId: string | undefined;
  tableNumber: number | undefined;
}

const initialState: TableNumberDetail = {
  tableNumber: undefined,
  tableSectionId: undefined,
};

const billingTable = createSlice({
  name: "billingTable",
  initialState,
  reducers: {
    updateBillingTable: (state, action: PayloadAction<TableNumberDetail>) => {
      const { tableNumber, tableSectionId } = action.payload;

      state.tableNumber = tableNumber;
      state.tableSectionId = tableSectionId;
    },
  },
});

export const { updateBillingTable } = billingTable.actions;

export default billingTable.reducer;
