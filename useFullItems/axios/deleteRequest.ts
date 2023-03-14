import { AxiosError } from "axios";
import { axios, ControllerURLS } from "./axios";
import { concatString } from "../functions/uilityFunctions";
import { constants } from "../constants";

export const axiosDeleteFunction = ({
  parentUrl,
  thenFunction,
  childUrl = "",
  data,
}: {
  parentUrl: ControllerURLS;
  thenFunction?: any;
  childUrl?: string;
  data?: any;
}) =>
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
    });
