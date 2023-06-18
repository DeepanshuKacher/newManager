import { AxiosError } from "axios";
import { axios, ControllerURLS } from "./axios";
import { concatString } from "../functions/uilityFunctions";
import { constants } from "../constants";
import { actionTypes, store } from "../redux";

export const axiosDeleteFunction = ({
  parentUrl,
  thenFunction,
  childUrl = "",
  useGlobalLoader,
  data,
}: {
  parentUrl: ControllerURLS;
  thenFunction?: any;
  childUrl?: string;
  useGlobalLoader?: boolean;

  data?: any;
}) => {
  if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(true));

  axios
    .delete(concatString(parentUrl, childUrl), { data })
    .then((response) => {
      // if (constants.IS_DEVELOPMENT) console.log({ response });
      if (thenFunction) {
        thenFunction(response.data);
      } else return response.data;
    })
    .catch((error: AxiosError) => {
      alert("Error " + error.code);
      console.log({ error });
    })
    .finally(() => {
      if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(false));
    });
};
