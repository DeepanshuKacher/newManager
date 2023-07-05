import { configureStore } from "@reduxjs/toolkit";
import restaurantInfo from "./restaurantInfo";
import loaderState from "./loaderState";
import globalAlert from "./globalAlert";
import dishesSlices from "../../pages/customize_restaurant/dishes/reduxSlice";
import addDishToSection from "../../pages/customize_restaurant/multiple_dish/sectionDetail.slice";
import orderContainer from "../../pages/realtime/orders/redux";
import tableOrders from "../../pages/realtime/table_status/redux";
import billingTable from "../../pages/realtime/table_status/[table_name]/redux";
import selfInfo from "./selfInfo";
import orderModal from "./orderModal";
import billingTamplate from "./billPrintTamplate";

const store = configureStore({
  reducer: {
    restaurantInfo,
    loaderState,
    dishesSlices,
    globalAlert,
    addDishToSection,
    orderContainer,
    tableStatus: tableOrders,
    billingTable,
    selfInfo,
    orderModal,
    billingTamplate,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
