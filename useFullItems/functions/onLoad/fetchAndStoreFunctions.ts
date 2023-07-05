import axios, { AxiosError } from "axios";
import { axiosGetFunction } from "../../axios";
import { actionTypes, store } from "../../redux";
import { Dish, InitialDataTypes } from "../../redux/restaurantInfo";
import { Operations } from "../../redux/billPrintTamplate";

export interface JsonOrder {
  completed: string;
  createdAt: string;
  dishId: string;
  fullQuantity: string;
  halfQuantity: string;
  kotId: string;
  orderedBy: string;
  orderId: string;
  restaurantId: string;
  size: "large" | "medium" | "small";
  tableNumber: number;
  tableSectionId: string;
  user_description: string;
  sessionId: string;
  chefAssign: string;
}

export interface Kot {
  id: `kot:${string}`;
  value: {
    kotId: string;
    tableSectionId: string;
    tableNumber: number;
    restaurantId: string;
    createdAt: number;
    orderedBy: string;
    completed: number;
    sessionId: string;
    chefAssign: string;
    orders: JsonOrder[];
  };
}

export const fetchAndStoreOrders = async () => {
  const data: Kot[] = await axiosGetFunction({
    parentUrl: "orders",
  });

  store.dispatch(actionTypes.storeDishOrders(data));
};

export const fetchAndStoreTableSession = async () => {
  const data = await axiosGetFunction({
    parentUrl: "sessions",
  });

  const tableSessions: any = {};

  for (let x in data) {
    const [tableSectionId, tableNumber] = x.split(":"),
      [sessionId] = data[x].split(":");

    tableSessions[tableSectionId] = tableSessions[tableSectionId] || {};
    tableSessions[tableSectionId][tableNumber] = sessionId;
  }

  store.dispatch(actionTypes.loadTableStatus(tableSessions));
};

export const fetchAndStoreRestaurantAndSelfDetail = async () => {
  axios
    .get(`/restaurants/getDetail`)
    .then((response) => {
      const data: {
        restaurantDetails: {
          dishesh: Dish[];
          tables: {
            name: string;
            id: string;
            endNumber: number;
            prefix: string;
            startNumber: number;
            suffix: string;
          }[];
          name: string;
          city: string;
          id: string;
        };
        settings: InitialDataTypes["defaultValues"]["settings"];
        waiters: {
          name: string;
          id: string;
          MobileNumber: number;
          passportPhoto: string;
          verified: boolean;
          available: boolean;
        }[];
        chefs: {
          name: string;
          id: string;
          MobileNumber: number;
          passportPhoto: string;
          verified: boolean;
          available: boolean;
        }[];
        selfInfo: {
          id: string;
        };
      } = response.data;

      const { city, dishesh, id, name, tables } = data.restaurantDetails;

      store.dispatch(
        actionTypes.updateRestaurantInfo({
          chefs: data.chefs,
          city,
          dishesh,
          id,
          name,
          settings: data.settings,
          tables,
          waiters: data.waiters,
          dishObj: {},
        })
      );

      store.dispatch(actionTypes.updateSelfInfo(data.selfInfo));
    })
    .catch((error: AxiosError) => {
      alert("Error");
      console.log({ error });
    });
};
export const fetchAndStoreTemplate = async () => {
  axios
    .get("templates")
    .then((response) => {
      const e: {
        operations: Operations[];
        upperSectionText: string;
      } = response.data;

      store.dispatch(
        actionTypes.updatePrintTemplateUpperMarkdown(e.upperSectionText)
      );

      store.dispatch(actionTypes.updateOperationArray(e.operations));
    })
    .catch((error: AxiosError) => {
      console.log(error);
      alert("Any error");
    });
};
