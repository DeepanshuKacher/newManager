import { Order } from "../../pages/realtime/orders/redux";
import { RestaurantSliceType } from "../redux/restaurantInfo";
import {
  updateTableStatus,
  pushInOrderContainer,
  convertCartToOrder,
  updateOrderStatus,
} from "./functions";

const mqttPayloadCode = {
  tableStatus: "tableStatus",
  dishOrder: "dishOrder",
  updateOrder: "updateOrder",
  cardDishOrder: "cardDishOrder",
} as const;

type Temp = typeof mqttPayloadCode;

interface Props {
  code: Temp[keyof typeof mqttPayloadCode];
  message: any;
}
export const mqttFunction = (props: Props) => {
  const { code, message } = props;
  // console.log(props);
  switch (code) {
    case "tableStatus":
      updateTableStatus(message);
      break;

    case "dishOrder":
      const dishOrdeData: {
        order: Order;
        orderNo: number;
      } = message;
      pushInOrderContainer(dishOrdeData);
      break;

    case "cardDishOrder":
      const data: {
        orderArray: Order[];
        orderNo: number;
      } = message;
      convertCartToOrder(data);
      break;

    case "updateOrder":
      updateOrderStatus(message);
      break;

    default:
      console.log(props);
      break;
  }
};
