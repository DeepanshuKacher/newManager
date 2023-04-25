import { Order } from "../../pages/realtime/orders/redux";
import { Dish } from "../redux/restaurantInfo";

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

export const calculatePrice = (order: Order, dish?: Dish) => {
  let returnPrice = 0;
  const { size, fullQuantity, halfQuantity } = order;

  if (size === "Large") {
    returnPrice = (fullQuantity || 0) * (dish?.FullLarge_Price || 0);
    returnPrice += (halfQuantity || 0) * (dish?.HalfLarge_Price || 0);
  } else if (size === "Medium") {
    returnPrice = (fullQuantity || 0) * (dish?.FullMedium_Price || 0);
    returnPrice += (halfQuantity || 0) * (dish?.HalfMedium_Price || 0);
  } else if (size === "Small") {
    returnPrice = (fullQuantity || 0) * (dish?.FullSmall_Price || 0);
    returnPrice += (halfQuantity || 0) * (dish?.HalfSmall_Price || 0);
  }
  return returnPrice;
};
