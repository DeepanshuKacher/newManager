import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navigation } from "../components/Navigation";
import { SSRProvider } from "react-bootstrap";
import { useRouter } from "next/router";
import { store, useAppSelector } from "../useFullItems/redux";
import { Provider } from "react-redux";
import { GlobalLoader } from "../components/Common/GlobalLoader";
import { constants, privateConstants } from "../useFullItems/constants";
import { Loader } from "../components/Common";
import { selectRestaurantFunction } from "../useFullItems/functions";
import { GlobalAlert } from "../components/Common/GlobalAlert";
import mqtt, { MqttClient } from "mqtt";
import { mqttFunction } from "../useFullItems/mqtt";
import { mqttConnection } from "../useFullItems/mqtt/client";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageFullyLoaded, setPageFullyLoaded] = useState(false);
  const [restaurantId, setRestaurantId] = useState<string>();
  const [selfInfo, setSelfInfo] = useState<{ id: string | undefined }>({
    id: undefined,
  });

  store.subscribe(() => {
    const getRestaurantId = store.getState().restaurantInfo.defaultValues.id;
    const selfData = store.getState().selfInfo;
    if (getRestaurantId && getRestaurantId !== restaurantId)
      setRestaurantId(getRestaurantId);
    if (
      selfData?.defaultValues?.id &&
      selfInfo.id !== selfData.defaultValues.id
    )
      setSelfInfo(selfData.defaultValues);
  });

  useEffect(() => {
    let client: MqttClient | void;
    if (restaurantId && selfInfo.id)
      client = mqttConnection(restaurantId, selfInfo.id);

    return () => {
      if (client)
        client.end(false, undefined, () => {
          if (constants.IS_DEVELOPMENT) console.log("mqtt connection ended");
        });
    };
  }, [restaurantId, selfInfo.id]);

  // useEffect(() => {
  //   (async () => {
  //     if (restaurantId) {
  //       console.log({ restaurantId });
  //       await selectRestaurantFunction(restaurantId, () => {
  //         setPageFullyLoaded(true);
  //       });
  //     } else {
  //       // await router.push("/");
  //       setPageFullyLoaded(true);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      const restaurantId =
        sessionStorage.getItem(constants.restaurantId) || undefined;
      if (restaurantId) {
        setRestaurantId(restaurantId);
        await selectRestaurantFunction(restaurantId);
        setPageFullyLoaded(true);
        if (constants.IS_PRODUCTION) router.push("/dashboard");
      } else {
        setPageFullyLoaded(true);
        router.push("/");
      }
    })();
  }, []);

  if (!pageFullyLoaded) return <Loader />;
  else
    return (
      <SSRProvider>
        {!["/", "/modify-restaurant/[edit_or_add]"].includes(
          router.pathname
        ) && <Navigation />}
        <Provider store={store}>
          <GlobalAlert />
          <GlobalLoader />
          <Component {...pageProps} />
        </Provider>
      </SSRProvider>
    );
}
