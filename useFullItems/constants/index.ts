// const enviornmentProcess = process.env

// const findenviornmentVariable = (variable: string) => {
//   const item = enviornmentProcess?.[variable]
//   if (item) return item
//   else throw new Error(`Enviornment variable ${variable} not found`)
// }
const enviornmant = process.env.NEXT_PUBLIC_enviornment;
//  findenviornmentVariable('NEXT_PUBLIC_enviornment')

const DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION";

const IS_DEVELOPMENT = enviornmant === DEVELOPMENT,
  IS_PRODUCTION = enviornmant === PRODUCTION,
  PRODUCTION_BASE_URL = "https://api.eatrofoods.com",
  DEVELOPMENT_BASE_URL = process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL,
  constants = {
    IS_DEVELOPMENT,
    IS_PRODUCTION,
    PRODUCTION_BASE_URL,
    DEVELOPMENT_BASE_URL,
    access_token: "access_token",
    restaurantId: "restaurantId",
    transparentBackgroundColor: "#000000a6",
    BASE_URL: IS_DEVELOPMENT ? DEVELOPMENT_BASE_URL : PRODUCTION_BASE_URL,
  };

const privateConstants = {
  mqttSubscribeUrl: (restaurantId: string) => `${restaurantId}/#`,
  // mqttSubscribeOrders: (restaurantId: string) => `${restaurantId}/order/#`,
  mqttHostName: process.env.NEXT_PUBLIC_mqtt_hostname,
  mqttPort: process.env.NEXT_PUBLIC_mqtt_port,
};

export { constants, privateConstants };
