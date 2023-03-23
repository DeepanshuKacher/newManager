import { AxiosError } from "axios";
import { axios, controllerUrls } from "../../axios/axios";
import { constants } from "../../constants";
import { actionTypes, store } from "../../redux";
import {
  fetchAndStoreOrders,
  fetchAndStoreTableSession,
} from "./fetchAndStoreFunctions";

export const selectRestaurantFunction = async (
  restaurantId: string,
  lastThenFunction?: () => void
) => {
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
    .then(() =>
      axios
        .get(`/restaurants/${restaurantId}`)
        // .then((response) => {
        // if (constants.IS_DEVELOPMENT) console.log(response.data);
        // return response;
        // })
        .then((data) => {
          console.log({ initialFetchData: data.data });
          store.dispatch(actionTypes.updateRestaurantInfo(data.data));
        })
        .then(() => {
          if (lastThenFunction) {
            lastThenFunction();
          }
        })
        .catch((error: AxiosError) => {
          alert("Error");
          console.log({ error });
        })
    )
    .catch((error: AxiosError) => {
      alert("Error");
      console.log({ error });
    })
    .finally(() => {
      store.dispatch(actionTypes.updateLoaderState(false));
    });

  const fetchAndStoreOrdersPromis = fetchAndStoreOrders();
  const fetchAndStoreTableSessionPromis = fetchAndStoreTableSession();

  await Promise.all([
    fetchAndStoreOrdersPromis,
    fetchAndStoreTableSessionPromis,
  ]);
};
