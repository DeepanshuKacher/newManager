import { axiosGetFunction } from "../../axios";
import { actionTypes, store } from "../../redux";

export const fetchAndStoreOrders = async () => {
  const data = await axiosGetFunction({
    parentUrl: "orders",
  });

  console.log("orders fetch", data);

  store.dispatch(actionTypes.storeDishOrders(data));
};

export const fetchAndStoreTableSession = async () => {
  const data = await axiosGetFunction({
    parentUrl: "sessions",
  });

  console.log("fetch table sessin ", data);

  const tableSessions: any = {};

  for (let x in data) {
    const [tableSectionId, tableNumber] = x.split(":"),
      [sessionId] = data[x].split(":");

    tableSessions[tableSectionId] = tableSessions[tableSectionId] || {};
    tableSessions[tableSectionId][tableNumber] = sessionId;
  }

  store.dispatch(actionTypes.loadTableStatus(tableSessions));
};
