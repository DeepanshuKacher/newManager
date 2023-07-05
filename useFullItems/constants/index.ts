const enviornmant = process.env.environment;

const DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
  constants = {
    IS_DEVELOPMENT: enviornmant === DEVELOPMENT,
    IS_PRODUCTION: enviornmant === PRODUCTION,
    PRODUCTION_BASE_URL: "https://api.eatrofoods.com",
    DEVELOPMENT_BASE_URL: "http://192.168.43.48:5000",
    access_token: "access_token",
    restaurantId: "restaurantId",
    transparentBackgroundColor: "#000000a6",
  };

const privateConstants = {
  mqttSubscribeUrl: (restaurantId: string) => `${restaurantId}/#`,
  mqttURL: "wss://mqtt.eatrofoods.com:8883",
};

export { constants, privateConstants };
