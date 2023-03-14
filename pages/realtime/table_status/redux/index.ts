import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TableNumberDetail = {
  tableSectionId: string;
  tableNumber: number;
  status: null | string;
};

interface TableStatus {
  [tableSectionId: string]: { [tableNumber: number]: null | string };
}

const tableDetail: TableStatus = {};

const tableStatus = createSlice({
  name: "tableStatus",
  initialState: {
    tableDetail,
  },
  reducers: {
    updateTableStatus: (state, action: PayloadAction<TableNumberDetail>) => {
      const { status, tableNumber, tableSectionId } = action.payload;

      state.tableDetail[tableSectionId] =
        state.tableDetail[tableSectionId] || {};

      state.tableDetail[tableSectionId][tableNumber] = status;
    },
    loadTableStatus: (state, action: PayloadAction<TableStatus>) => {
      state.tableDetail = action.payload;
    },
  },
});

export const { updateTableStatus, loadTableStatus } = tableStatus.actions;

export default tableStatus.reducer;
