import { Link } from "react-router-dom";

const HistoryNoData = () => {
  return (
    <div className="flex flex-col items-center gap-6 mt-48">
      <div className="flex flex-col items-center gap-1 text-gray-500">
        <p>운동 기록이 없습니다.</p>
        <p>지금 바로 운동을 계획해보세요!</p>
      </div>
      <div className="w-1/2 p-2 font-semibold text-center text-teal-700 border border-teal-700 rounded-full">
        <Link to={`/diary/training/choice/basic`}>
          <button>운동하러 가기</button>
        </Link>
      </div>
    </div>
  );
};

export default HistoryNoData;
