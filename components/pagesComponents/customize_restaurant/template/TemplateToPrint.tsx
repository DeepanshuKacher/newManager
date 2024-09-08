import React from "react";
import ReactMarkdown from "react-markdown";

import styles from "../../../../styles/MarkDown.module.css";
import { Order } from "../../../../pages/realtime/orders/redux";
import { useAppSelector } from "../../../../useFullItems/redux";
import { calculatePriceForOrder } from "../../../../useFullItems/functions";
import QRCode from "react-qr-code";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import dateFormatter from "dayjs";
import { constants } from "../../../../useFullItems/constants";

enum OperationType {
  Plus = "Plus",
  Minus = "Minus",
  Multiply = "Multiply",
  Divide = "Divide",
  Percentage = "Percentage",
}

enum GainLoss {
  gain = "gain",
  loss = "loss",
}

type Operations = {
  label: string;
  number: number;
  operation: OperationType;
  gainLoss: GainLoss;
};

interface Props {
  upperMarkDown: string;
  operationsArray: Operations[];
  orders?: Order[];
  prefix?: string | undefined;
  suffix?: string | undefined;
  tableNumber?: number;
  shouldDisplayNone?: boolean;
  kotNumber?: number;
  tableSectionId?: number;
  retaurantId?: string;
}

const TemplateToPrint = React.forwardRef((props: Props, ref: any) => {
  const {
    upperMarkDown,
    operationsArray,
    orders,
    prefix,
    suffix,
    tableNumber,
    shouldDisplayNone,
    kotNumber,
    retaurantId,
    tableSectionId,
  } = props;

  // console.log({ operationsArray });

  const { dishObj } = useAppSelector(
    (store) => store.restaurantInfo.defaultValues
  );

  const subtotal = calculatePriceForOrder(orders || []);

  const calculateGrandTotal = (
    operationsArray: Operations[] = [],
    subTotal: number
  ) => {
    let returnValue = subTotal;
    operationsArray.forEach((operation) => {
      const operationValue = calculateOperations(
        operation?.operation,
        operation?.number,
        subTotal
      );

      const operationValueAbs = Math.abs(operationValue || 0);
      // returnValue = returnValue + (operationValue || 0);

      if (operation?.gainLoss === "gain") returnValue += operationValueAbs || 0;
      else if (operation?.gainLoss === "loss")
        returnValue -= operationValueAbs || 0;
    });

    return Math.ceil(returnValue);
  };

  const calculateOperations = (
    operation: OperationType,
    number: Operations["number"],
    // gailLoss: GainLoss,
    totalPrice: number
  ) => {
    switch (operation) {
      case "Percentage":
        // return (number / 100) * totalPrice;
        return Math.ceil((number / 100) * totalPrice * 100) / 100;
    }
  };

  return (
    <Row className="p-2" xs="auto">
      <Col>
        <div className={styles.upperMarkdownDiv}>
          <ReactMarkdown>{upperMarkDown}</ReactMarkdown>
        </div>
        <div>
          <p className={styles.infoDivPara}>
            Date/Time: {dateFormatter(new Date()).format("D-MMM-YY, h:mm A")}
          </p>
          <p className={styles.infoDivPara}>
            Table/Room No: {prefix}
            {tableNumber ? tableNumber : ""}
            {suffix}
          </p>
          {kotNumber ? (
            <p className={styles.infoDivPara}>Kot No.: {kotNumber}</p>
          ) : null}
        </div>
        <hr />
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
              <th>Qty</th>
              <th>Rate</th>
              <th>Amt</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => {
              const dish = dishObj[order.dishId];

              const fullQuantityNumber = order.fullQuantity;
              const halfQuantityNumber = order.halfQuantity;

              if (fullQuantityNumber > 0 && halfQuantityNumber > 0)
                return (
                  <React.Fragment key={order.orderId + fullQuantityNumber}>
                    <tr>
                      <td>{dish.name} - F</td>
                      <td>{fullQuantityNumber}</td>
                      <td>{dish?.price?.[order?.size]?.full}</td>
                      <td>
                        {fullQuantityNumber *
                          (dish?.price?.[order?.size]?.full || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td>{dish.name} - H</td>
                      <td>{halfQuantityNumber}</td>
                      <td>{dish?.price?.[order?.size]?.half}</td>
                      <td>
                        {halfQuantityNumber *
                          (dish?.price?.[order?.size]?.half || 0)}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              else if (fullQuantityNumber > 0)
                return (
                  <tr key={order.orderId + fullQuantityNumber}>
                    <td>{dish.name}</td>
                    <td>{fullQuantityNumber}</td>
                    <td>{dish?.price?.[order?.size]?.full}</td>
                    <td>
                      {fullQuantityNumber *
                        (dish?.price?.[order?.size]?.full || 0)}
                    </td>
                  </tr>
                );
              else if (halfQuantityNumber > 0)
                return (
                  <tr key={order.orderId + halfQuantityNumber}>
                    <td>{dish.name}</td>
                    <td>{halfQuantityNumber}</td>
                    <td>{dish?.price?.[order?.size]?.half}</td>
                    <td>
                      {halfQuantityNumber *
                        (dish?.price?.[order?.size]?.half || 0)}
                    </td>
                  </tr>
                );
            })}

            <tr style={{ borderTop: "solid grey 1px" }}>
              <th colSpan={3}>Total</th>
              <th>{subtotal}</th>
            </tr>
            {operationsArray?.map((operation, index) => {
              return (
                <tr key={index}>
                  <th>{operation.label}</th>
                  <td colSpan={2}>
                    {operation.number}
                    {operation.operation === "Percentage"
                      ? "%"
                      : operation.operation === "Plus"
                      ? "+"
                      : "nil"}
                  </td>
                  <td>
                    {calculateOperations(
                      operation.operation,
                      operation.number,
                      // operation.gainLoss,
                      subtotal
                    )}
                  </td>
                </tr>
              );
            })}
            <tr>
              <th colSpan={3}>Grand Total</th>
              <th>{calculateGrandTotal(operationsArray, subtotal)}</th>
            </tr>
          </tbody>
        </table>
        <div className={styles.lowerMachine}>
          <p style={{ fontSize: "small", textAlign: "center" }}>
            Thank You Visit Again
          </p>
        </div>
      </Col>
      {/* <ReactMarkdown>{lowerMarkDown}</ReactMarkdown> */}
      {tableNumber && retaurantId && (
        <Col className="m-2">
          <QRCode
            value={`${constants.BASE_URL}/foodie/${retaurantId}/${tableSectionId}/${tableNumber}`}
          />
        </Col>
      )}
    </Row>
  );
});

TemplateToPrint.displayName = "TemplateToPrint";

export { TemplateToPrint };
