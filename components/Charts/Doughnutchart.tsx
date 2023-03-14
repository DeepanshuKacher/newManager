import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Available", "Booked", "Total"],
  datasets: [
    {
      data: [12, 19, 20],
      backgroundColor: ["green", "purple", "orange"],
      // borderColor: [
      //   "rgba(255, 99, 132, 1)",
      //   "rgba(54, 162, 235, 1)",
      //   "rgba(255, 206, 86, 1)",
      //   "blue",
      // ],
      borderWidth: 1,
    },
  ],
};

function Doughnutchart() {
  return (
    <Doughnut
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { labels: { font: { size: 12 } } },
        },
      }}
      data={data}
    />
  );
}

export { Doughnutchart };
