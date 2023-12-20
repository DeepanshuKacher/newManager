import { pythonKotWebsocket } from "..";
import { Order, PythonKotPrint } from "../../../interfaces";
import { store } from "../../redux";



export const printKot = (kot: Order[]) => {
    const tempARr: PythonKotPrint[] = []

    const { dishObj } = store.getState().restaurantInfo.defaultValues

    const pushToTempArr = (item: Order, halfFull: PythonKotPrint['halfFull']) => {
        const dishInfo = dishObj[item.dishId]
        console.log(dishInfo);
        console.log(item.dishId);
        console.log(dishObj);
        const size = item.size === 'large' ? 'L' : item.size === 'medium' ? 'M' : 'S'
        const quantity = halfFull === 'H' ? item.halfQuantity : item.fullQuantity
        tempARr.push({
            dishName: dishInfo.name,
            halfFull: halfFull,
            quantity,
            size,
            kotCount: item?.kotCount,
            printCount: item?.printCount,
            kotId: item?.kotId
        })
    }

    for (const x of kot) {
        const { halfQuantity, fullQuantity } = x

        if (halfQuantity && fullQuantity) {

            pushToTempArr(x, 'F')
            pushToTempArr(x, 'H')


        }

        else if (halfQuantity) {


            pushToTempArr(x, 'H')

        }

        else if (fullQuantity) {

            pushToTempArr(x, 'F')

        }



    }

    if (pythonKotWebsocket.OPEN === pythonKotWebsocket.readyState) {

        console.log(tempARr);

        pythonKotWebsocket.send(JSON.stringify(tempARr))
    } else {
        // throw new Error("python websocket not open")
        alert('Printer is not connected please reload')
    }
}