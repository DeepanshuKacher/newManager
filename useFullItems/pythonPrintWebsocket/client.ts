import axios from "axios";
import { constants } from "../constants";
import { axiosPatchFunction, axiosPostFunction } from "../axios";

let ws: WebSocket;

if (typeof window !== 'undefined') {
    ws = new WebSocket("ws://localhost:8765/kot");

    ws.onclose = () => {
        if (constants.IS_DEVELOPMENT) console.log("Connection Closed");

        setTimeout(() => {
            if (ws.readyState !== 1) {
                ws = new WebSocket("ws://localhost:8765/kot");
            }
        }, 5000);
    }

    ws.onopen = () => {
        if (constants.IS_DEVELOPMENT) console.log("Connection Open");
    }

    ws.onerror = (error) => {
        if (constants.IS_DEVELOPMENT) console.log("Error Occurred", error);
    }

    ws.onmessage = (event) => {
        if (event.data) {
            axiosPatchFunction({
                data: {
                    kotId: JSON.parse(event.data).kotId
                }, parentUrl: 'orders',
                childUrl: 'incrementPrintCount'
            })
        }
    }
}

export { ws as pythonKotWebsocket }