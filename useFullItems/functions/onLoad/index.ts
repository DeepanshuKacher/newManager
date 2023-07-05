import { AxiosError } from "axios";
import { axios, controllerUrls } from "../../axios/axios";
import { constants } from "../../constants";
import { actionTypes, store } from "../../redux";
import {
  fetchAndStoreOrders,
  fetchAndStoreRestaurantAndSelfDetail,
  fetchAndStoreTableSession,
  fetchAndStoreTemplate,
} from "./fetchAndStoreFunctions";

export const selectRestaurantFunction = async (restaurantId: string) => {
  // axiosGetFunction({
  //   parentUrl: "restaurants",
  //   childUrl: restaurantId,
  //   config: { withCredentials: true },
  //   useGlobalLoader: true,
  //   thenFunction: (e: { name: string; id: string; city: string }) => {
  //     store.dispatch(actionTypes.updateRestaurantInfo(e));
  //     router.push("/dashboard");
  //   },
  // });

  if (!restaurantId) {
    if (constants.IS_DEVELOPMENT) console.log("Please Provide restaurant id");
    return alert("Some Error");
  }

  store.dispatch(actionTypes.updateLoaderState(true));

  await axios
    .post(
      controllerUrls.auth + "/jwt",
      { restaurantId },
      { withCredentials: true }
    )
    .then(async (response) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.data?.access_token}`;
    })
    .then(() => sessionStorage.setItem(constants.restaurantId, restaurantId))
    .catch((error: AxiosError) => {
      alert("Error");
      console.log({ error });
    })
    .finally(() => {
      store.dispatch(actionTypes.updateLoaderState(false));
    });

  const fetchAndStoreOrdersPromis = fetchAndStoreOrders();
  const fetchAndStoreTableSessionPromis = fetchAndStoreTableSession();
  const fetchAndStoreRestaurantAndSelfDetailPromis =
    fetchAndStoreRestaurantAndSelfDetail();
  const fetchAndStoreTemplatePromise = fetchAndStoreTemplate();

  await Promise.all([
    fetchAndStoreOrdersPromis,
    fetchAndStoreTableSessionPromis,
    fetchAndStoreRestaurantAndSelfDetailPromis,
    fetchAndStoreTemplatePromise,
  ]);
};
