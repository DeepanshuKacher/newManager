import { Order } from "../pages/realtime/orders/redux";

export type {
  Dish,
  RestaurantSliceType,
  Table,
  WaiterType,
} from "../useFullItems/redux/restaurantInfo";
export type { DishesSliceType } from "../pages/customize_restaurant/dishes/reduxSlice";

interface Order_Logs {
  id: string;
  sessionLogsUuid: string;
  dishId: string;
  user_description: string;
  waiterId: string;
  size: Order["size"];
  fullQuantity?: number;
  halfQuantity?: number;
  chefId: string;
  orderTimeStamp: string;
  cost: number;
}

export interface SessionLog {
  uuid: string;
  Order_Logs: Order_Logs[];
  tableNumber: 12;
  tableId: string;
  sessionCreationTime: string;
  restaurantId: string;
}
