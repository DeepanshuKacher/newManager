import { AxiosError, AxiosRequestConfig } from "axios";
import { concatString } from "../functions";
import { axios, ControllerURLS } from "./axios";
import { store, actionTypes } from "../redux";

export const axiosGetFunction = async ({
  parentUrl,
  thenFunction,
  childUrl = "",
  config,
  useGlobalLoader,
}: {
  thenFunction?: any;
  parentUrl: ControllerURLS;
  childUrl?: string;
  config?: AxiosRequestConfig;
  useGlobalLoader?: boolean;
}) => {
  if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(true));
  return await axios
    .get(concatString(parentUrl, childUrl), config)
    .then((response) => {
      // console.log(response.data);
      if (thenFunction) {
        thenFunction(response.data);
      } else return response.data;
    })
    .catch((error: AxiosError) => {
      alert("Error " + error.name);
      console.log(error, error.cause, error.message, error.name, error.config);
    })
    .finally(() => {
      if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(false));
    });
};
