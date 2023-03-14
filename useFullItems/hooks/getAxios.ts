import { useState, useEffect } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { concatString } from "../functions";
import { axios, ControllerURLS } from "../axios/axios";
import { store, actionTypes } from "../redux";

interface Props {
  childUrl?: string;
  parentUrl: ControllerURLS;
  config?: AxiosRequestConfig;
  useGlobalLoader?: boolean;
  useEffectDependency?: any;
}

export const useAxiosGet: <T>(props: Props) => {
  data: T;
  error: AxiosError | unknown;
  loading: boolean;
} = (props) => {
  const {
    childUrl = "",
    parentUrl,
    config,
    useGlobalLoader,
    useEffectDependency,
  } = props;

  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  const toggleLoader = (ONOFF: boolean) => {
    if (useGlobalLoader) store.dispatch(actionTypes.updateLoaderState(ONOFF));
    else setLoading(ONOFF);
  };

  const fetchData = () => {
    axios
      .get(concatString(parentUrl, childUrl), config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
        console.log({ error });
      })
      .finally(() => toggleLoader(false));
  };

  useEffect(() => {
    toggleLoader(true);
    console.log("work");
    fetchData();
  }, [useEffectDependency]);

  return { data, error, loading };
};
