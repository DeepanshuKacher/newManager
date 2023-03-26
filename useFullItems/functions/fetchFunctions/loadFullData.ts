import { axiosGetFunction } from "../../axios";
import { actionTypes, store } from "../../redux";
import { RestaurantSliceType } from "../../redux/restaurantInfo";

export const loadFullData = () => {
  const restaurantId = store.getState().restaurantInfo.defaultValues.id;
  if (!restaurantId) {
    throw new Error("no restaurant id");
  }
  axiosGetFunction({
    parentUrl: "restaurants",
    childUrl: restaurantId,
    thenFunction: (data: RestaurantSliceType) =>
      store.dispatch(actionTypes.updateRestaurantInfo(data)),
  });
};
