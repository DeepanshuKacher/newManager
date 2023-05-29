import React from "react";
import ReactMarkdown from "react-markdown";

import styles from "../../../../styles/MarkDown.module.css";

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
}

const TemplateToPrint = React.forwardRef((props: Props, ref: any) => {
  const { upperMarkDown, operationsArray } = props;

  return (
    <div
      style={{
        width: "300px",
        // textAlign: "center",
        paddingLeft: "15px",
        paddingRight: "10px",
        // backgroundColor: "blue",
        // scale: "0.8",
      }}
      ref={ref}
      className={styles.marzinZero}
    >
      <div className={styles.upperMarkdownDiv}>
        <ReactMarkdown>{upperMarkDown}</ReactMarkdown>
      </div>
      <div>
        <p className={styles.infoDivPara}>Date: 29-Apr-23</p>
        <p className={styles.infoDivPara}>Time: 4:32pm</p>
        <p className={styles.infoDivPara}>Table/Room No: H5G</p>
        <p className={styles.infoDivPara}>Bill No.: 45</p>
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
          <tr>
            <td>Masala Cold Drink</td>
            <td>2</td>
            <td>35</td>
            <td>70</td>
          </tr>
          <tr style={{ borderTop: "solid grey 1px" }}>
            <th colSpan={3}>Sub Total</th>
            <th>1000</th>
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
                <td>2500</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.lowerMachine}>
        <p style={{ fontSize: "small" }}>Rupees Thirty-Sever Only</p>
        <p style={{ fontSize: "small", textAlign: "center" }}>
          Thank You Visit Again
        </p>
      </div>
      {/* <ReactMarkdown>{lowerMarkDown}</ReactMarkdown> */}
    </div>
  );
});

TemplateToPrint.displayName = "TemplateToPrint";

export { TemplateToPrint };
