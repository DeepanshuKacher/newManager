import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { updateLoaderState } from "./loaderState";
import { updateRestaurantInfo } from "./restaurantInfo";
import { updateSectionInfo } from "../../pages/customize_restaurant/dishes/reduxSlice";
import store from "./store";
import { resetAlert, updateAlertInfo } from "./globalAlert";
import {
  resetSectionDetail,
  sectionDetail,
} from "../../pages/customize_restaurant/multiple_dish/sectionDetail.slice";
import {
  unshiftInOrderContainer,
  storeDishOrders,
  orderAccepted,
  orderCompleted,
  orderRemove,
} from "../../pages/realtime/orders/redux";
import {
  updateTableStatus,
  loadTableStatus,
} from "../../pages/realtime/table_status/redux";
import { updateBillingTable } from "../../pages/realtime/table_status/[table_name]/redux";
import { updateSelfInfo } from "./selfInfo";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store };
export const actionTypes = {
  updateLoaderState,
  updateRestaurantInfo,
  updateSectionInfo,
  updateAlertInfo,
  resetAlert,
  sectionDetail,
  resetSectionDetail,
  unshiftInOrderContainer,
  updateTableStatus,
  storeDishOrders,
  loadTableStatus,
  updateBillingTable,
  orderAccepted,
  orderCompleted,
  orderRemove,
  updateSelfInfo,
};
