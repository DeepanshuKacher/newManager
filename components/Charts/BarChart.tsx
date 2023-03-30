import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart.defaults.datasets.bar.barThickness = 10;
// Chart.defaults.datasets.

// ["January", "February", "March", "April", "May", "June", "July"];
const labels = ["Fish", "Dosa", "Biryani", "Idli", "Chai", "Paneer", "Cofee"];

export function BarChart() {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
      }}
      data={{
        labels,
        datasets: [
          {
            // label: "Dataset 1",
            data: labels.map(() =>
              faker.datatype.number({ min: 0, max: 1000 })
            ),
            backgroundColor: labels.map(() => faker.color.rgb()),
            barThickness: 20,
          },
        ],
      }}
    />
  );
}
