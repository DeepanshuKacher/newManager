import { useState } from "react";
import { Order } from "../../pages/realtime/orders/redux";
import { Dish } from "../redux/restaurantInfo";
import dateFormatter from "dayjs";
import { store } from "../redux";
import { OrderReturnFromRedis } from "../../interfaces";

export const concatString = (...args: string[]) =>
  args.reduce(
    (previousValues, currentValue) =>
      currentValue ? previousValues + "/" + currentValue : previousValues,
    ""
  );

export const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const formatDate = (dateString: string) =>
  dateFormatter(dateString).format("MMMM D, h:mm A");

export const convertNumberStringToInt = (numberString: string | undefined) => {
  if (!numberString) return undefined;

  return parseInt(numberString);
};

export const calculatePrice = (order: Order, dish?: Dish) => {
  let returnPrice = 0;
  const { size, fullQuantity, halfQuantity } = order;

  returnPrice =
    fullQuantity *
    (dish?.price?.[order.size]?.full || 0);
  returnPrice +=
    halfQuantity *
    (dish?.price?.[order.size]?.half || 0);

  return returnPrice;
};


export const convertRedisOrderToOrder = (redisOrder: OrderReturnFromRedis): Order => {

  const {
    createdAt,
    dishId,
    fullQuantity,
    halfQuantity,
    kotId,
    orderedBy,
    orderId,
    restaurantId,
    sessionId,
    size,
    tableNumber,
    tableSectionId,
    chefAssign,
    completed,
    user_description
  } = redisOrder

  return {
    createdAt: parseInt(createdAt),
    dishId, fullQuantity: parseInt(fullQuantity),
    halfQuantity: parseInt(halfQuantity), kotId, orderedBy,
    orderId, restaurantId, sessionId, size, tableNumber: parseInt(tableNumber),
    tableSectionId, chefAssign, completed, user_description
  }

}


export const calculatePriceForOrder = (orders: Order[]) => {
  const { dishObj } = store.getState().restaurantInfo.defaultValues;

  let returnPrice = 0;

  for (let x of orders) {
    returnPrice += calculatePrice(x, dishObj[x.dishId]);
  }

  return returnPrice;
};

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export const useFormState = (): [
  string,
  (para: React.ChangeEvent<FormControlElement>) => void
] => {
  const [getValue, setValue] = useState("");

  const modifySetValue = (formInput: React.ChangeEvent<FormControlElement>) =>
    setValue(formInput.target.value);

  return [getValue, modifySetValue];
};
