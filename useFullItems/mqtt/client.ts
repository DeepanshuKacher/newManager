import mqtt from "mqtt";
import { privateConstants, constants } from "../constants";
import { mqttFunction } from ".";

export const mqttConnection = (restaurantId: string) => {
  const client = mqtt.connect(privateConstants.mqttURL);
  client.on("connect", () => {
    client.subscribe(
      privateConstants.mqttSubscribeUrl(restaurantId),
      { qos: 0 },
      (error, granted) => {
        if (granted) {
          console.log("mqtt connected & subscribed");
        }
      }
    );
  });
  client.on("message", (topic, payload) =>
    mqttFunction(JSON.parse(payload.toString()))
  );

  client.on("disconnect", () => {
    if (constants.IS_DEVELOPMENT) console.log("Mqtt is disconnected");
  });

  client.on("reconnect", () => {
    if (constants.IS_DEVELOPMENT) console.log("mqtt is reconnecting");
  });

  return client;
};
