import mqtt from "mqtt";
import { privateConstants, constants } from "../constants";
import { mqttFunction } from ".";

export const mqttConnection = (restaurantId: string, selfId: string) => {
  if (!(restaurantId && selfId)) return alert("Please reload");

  const client = mqtt.connect({
    port: parseInt(privateConstants.mqttPort!),
    clientId: selfId,
    protocol: 'wss',
    hostname: privateConstants.mqttHostName
  });

  // console.log({
  //   host: privateConstants.mqttHost,
  //   port: parseInt(privateConstants.mqttPort!),
  //   clientId: selfId
  // })

  // const client = mqtt.connect(`wss://mqtt.eatrofoods.com:8883`,{
  //   clientId:selfId
  // })


  client.on("connect", () => {
    client.subscribe(
      privateConstants.mqttSubscribeUrl(restaurantId),
      { qos: 0 },
      (error, granted) => {
        if (granted) {
          if (constants.IS_DEVELOPMENT)
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

  client.on("offline", () => {
    if (constants.IS_DEVELOPMENT) console.log("mqtt is offline");
  });
  // setInterval(() => {
  //   console.log("is mqtt connected ", client.connected);
  //   console.log("is mqtt disconnected ", client.disconnected);
  // }, 1000);

  return client;
};
