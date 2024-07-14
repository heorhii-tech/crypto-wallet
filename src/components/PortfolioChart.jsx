import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useSelector((state) => state.assets);

  const data = {
    labels: assets.map((a) => a.id),
    datasets: [
      {
        label: "$",
        data: assets.map((a) => a.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235,  0.4)",
          "rgba(255, 206, 86,  0.4)",
          "rgba(75, 192, 192,  0.4)",
          "rgba(153, 102, 255,  0.4)",
          "rgba(255, 159, 64,  0.4)",
        ],
      },
    ],
  };

  return (
    <div className="chart">
      <Pie style={{ width: `400px` }} data={data} />
    </div>
  );
}
