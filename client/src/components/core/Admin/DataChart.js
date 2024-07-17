import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const DataChart = ({ value, label }) => {
  const labels = label;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: [
          "#007D9C",
          "#FE452A",
          "#F7E018",
          "#244D70",
          "#D123B3",
          "#fff",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        data: value,
      },
    ],
  };

  console.log("pie", data);

  return (
    <div className="w-[350px] mx-auto p-4">
      <Pie data={data} width={20} height={20} />
    </div>
  );
};
export default DataChart;
