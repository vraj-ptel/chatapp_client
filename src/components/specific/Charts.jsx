import { Line, Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { getLast7Days } from "../../lib/feactures";
import { teal } from "../constant/color";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Tooltip,
  Legend
);

// LINECHARTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
const LineChart = ({ value = [] }) => {
  const labels = getLast7Days();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "messages",
        data: value,
        borderColor: teal,
        backgroundColor: "rgba(53, 162, 235, 0.1)",
      },
    ],
  };
  return (
    <>
      <Line data={data} options={options}></Line>
    </>
  );
};

const DoughnutChart = ({ value = [],labels=[] }) => {
    
    const option = {
      responsive:true,
      cutout:100
    }
  const data= {
    labels,
    datasets: [
      {
        label: "Total Chats Vs Group Chats",
        data: value,
        
          backgroundColor: [
            'rgba(255, 99, 132, 0.2) ',
            'rgba( 128, 203, 196,0.2)',
           
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba( 128, 203, 196,1)',
           
          ],
          borderWidth: 1,
          offset:10
      },
    ],
  };

  return (
    <>
      <Doughnut  data={data} options={option} />;
    </>
  );
};
export { LineChart, DoughnutChart };
