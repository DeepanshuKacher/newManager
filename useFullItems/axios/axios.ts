import { constants } from "../constants";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = constants.IS_PRODUCTION
  ? constants.PRODUCTION_BASE_URL
  : constants.DEVELOPMENT_BASE_URL;

/* export const initialFetch = async () =>
  await axios
    .get("auth/jwt", { withCredentials: true })
    .then((response) => {
      console.log({ response });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access_token;
    })
    .catch((error: AxiosError) => {
      console.log({ error });
    }); */

export const controllerUrls = {
  auth: "auth",
  chefs: "chefs",
  dishes: "dishes",
  dishSection: "dish-sections",
  restaurant: "restaurants",
  orders: "orders",
  sessions: "sessions",
  tables: "tables",
  waiters: "waiters",
  restaurantsignup: "restaurantsignup",
  restaurantSetting: "restaurant-setting",
  revenueAnalysis: "analysis/revenue",
  dishAnalysis: "analysis/dish",
  kot: "kot",
  templates: "templates",
} as const;

type KeysOfUrls = keyof typeof controllerUrls;
export type ControllerURLS = (typeof controllerUrls)[KeysOfUrls];

export { axios };
