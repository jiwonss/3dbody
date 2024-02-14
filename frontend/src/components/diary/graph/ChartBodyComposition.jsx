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

const ChartBodyComposition = () => {
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
      y_sub: {
        position: "right",
        title: {
          display: true,
          align: "end",
          color: "#808080",
          font: {
            size: 12,
            family: "'Noto Sans KR', sans-serif",
            weight: 300,
          },
          text: "단위: %",
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
        label: "골격근량",
        data: inbodyList.map((data) => {
          return data.muscle;
        }),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        yAxisID: "y",
      },
      {
        label: "체지방량",
        data: inbodyList.map((data) => {
          return data.fat_mass;
        }),
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
        yAxisID: "y",
      },
      {
        label: "체지방율",
        data: inbodyList.map((data) => {
          return data.fat_per;
        }),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y_sub",
      },
    ],
  };

  return (
    <div className="px-2">
      <div className="flex justify-center mb-4">
        <div className="px-4 py-1 italic font-semibold bg-white border border-gray-700 rounded-lg text-sky-300">
          체성분 변화량
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartBodyComposition;
