import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { inbodyListState } from "../../../recoil/common/InbodyState";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartWeight = () => {
  const inbodyList = useRecoilValue(inbodyListState);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        axis: "x",
        position: "bottom",
        ticks: {
          minRotation: 45,
          padding: 5,
        },
      },
      y: {
        axis: "y",
        display: true,
        position: "left",
        title: {
          display: true,
          align: "end",
          color: "#808080",
          font: {
            size: 12,
            family: "'Noto Sans KR', sans-serif",
            weight: 300,
          },
          text: "단위: kg",
        },
      },
    },
  };

  const labels = inbodyList.map((data) => {
    return data.date.substring(5, 10);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "체중",
        data: inbodyList.map((data) => {
          return data.weight;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  return (
    <div className="px-2 py-8 bg-white">
      <div className="flex justify-center mb-4">
        <div className="px-4 py-1 italic font-semibold bg-white border border-gray-700 rounded-lg text-rose-300">체중 변화량</div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartWeight;
