import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const defaultData: ChartData<"line", number[], string> = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

interface Props {
  data?: ChartData<"line", number[], string>;
  displayLegend?: boolean;
  title?: string;
}

export function LineChart(props: Props) {
  const { data, displayLegend, title } = props;
  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            display: displayLegend ? displayLegend : false,
          },
          title: {
            display: title ? true : false,
            text: title ? title : "",
          },
        },
        maintainAspectRatio: false,
      }}
      data={data || defaultData}
    />
  );
}
