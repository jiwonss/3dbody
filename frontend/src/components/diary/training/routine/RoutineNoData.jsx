import { Link } from "react-router-dom";

const RoutineNoData = () => {
  return (
    <div className="flex flex-col items-center gap-6 mt-48">
      <div className="flex flex-col items-center gap-1 text-gray-500">
        <p>저장된 루틴이 없습니다.</p>
        <p>루틴을 만들어 바로 운동해보세요!</p>
      </div>
      <div className="w-1/2 p-2 font-semibold text-center text-teal-700 border border-teal-700 rounded-full">
        <Link to={`/diary/training/myroutine/create`}>루틴 만들기</Link>
      </div>
    </div>
  );
};

export default RoutineNoData;
