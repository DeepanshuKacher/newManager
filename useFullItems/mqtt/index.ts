import {
  updateTableStatus,
  pushInOrderContainer,
  convertCartToOrder,
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
      pushInOrderContainer(message);
      break;

    case "cardDishOrder":
      convertCartToOrder(message);
      break;

    default:
      console.log(props);
      break;
  }
};
