import React, { useContext } from "react";
import style from "../../../../styles/Custom.module.css";
// import { Kot } from "../../../../useFullItems/functions/onLoad/fetchAndStoreFunctions";
// import { KOTLogs } from "../../../../pages/logs/orders_logs";
import { useAppSelector } from "../../../../useFullItems/redux";



export const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
  //   const value = props.kot?.value;
  //   const { dish, tables } = useContext(MyContext);
  //   const selectedTable = tables[props.kot?.value?.tableSectionId!];
  const { dishObj, tables } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );
  const selectedTable = props.kot?.parcel
    ? null
    : tables.find((table) => table.id === props?.kot?.tableId);
  return (
    <div
      style={{
        width: "300px",
        paddingLeft: "15px",
        paddingRight: "10px",
      }}
      className={style.printKOT}
      ref={ref}
    >
      {/* <h6>Guru Kripa KOT No. {value?.kotNo}</h6> */}
      <p>
        Table:-{" "}
        {selectedTable
          ? `${selectedTable?.prefix}
        ${props.kot?.tableNumber}
        ${selectedTable?.suffix}`
          : "parcel"}
      </p>
      <table
        style={{
          fontSize: "small",
          // backgroundColor: "blue",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Item</th>
            {/* <td>H/F</td> */}
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {props.kot?.KotOrder.map((order: any, index: number) => {
            return (
              <tr key={index}>
                <td>{dishObj[order?.dishId]?.name}</td>
                <td>{order.fullQuantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";
