import { Order } from "./OrderStuffs";

export interface PythonKotPrint {
    size: "L" | "M" | "S"
    quantity: number
    halfFull: "H" | "F"
    dishName: string
    kotCount: Order['kotCount']
    printCount: Order['printCount']
    kotId:Order['kotId']
}