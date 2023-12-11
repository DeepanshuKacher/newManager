
// const enviornmentProcess = process.env

// const findenviornmentVariable = (variable: string) => {
//   const item = enviornmentProcess?.[variable]
//   if (item) return item
//   else throw new Error(`Enviornment variable ${variable} not found`)
// }
const enviornmant = process.env.NEXT_PUBLIC_enviornment
//  findenviornmentVariable('NEXT_PUBLIC_enviornment')


const DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
  constants = {
    IS_DEVELOPMENT: enviornmant === DEVELOPMENT,
    IS_PRODUCTION: enviornmant === PRODUCTION,
    PRODUCTION_BASE_URL: "https://api.eatrofoods.com",
    DEVELOPMENT_BASE_URL: process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL,
    access_token: "access_token",
    restaurantId: "restaurantId",
    transparentBackgroundColor: "#000000a6",
  };

const privateConstants = {
  mqttSubscribeUrl: (restaurantId: string) => `${restaurantId}/#`,
  mqttHost: process.env.NEXT_PUBLIC_mqtt_host,
  mqttPort: process.env.NEXT_PUBLIC_mqtt_port

};

export { constants, privateConstants };
