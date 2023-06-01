import axios, { AxiosError } from "axios";
import { axiosGetFunction } from "../../axios";
import { actionTypes, store } from "../../redux";
import { Dish, InitialDataTypes } from "../../redux/restaurantInfo";

export const fetchAndStoreOrders = async () => {
  const data = await axiosGetFunction({
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
