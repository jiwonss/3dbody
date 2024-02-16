import { useSetRecoilState } from "recoil";
import { modalState } from "../../../../recoil/modal/ModalState";

const RoutineNoData = () => {
  const setModalData = useSetRecoilState(modalState);

  const onRoutineCreateHandler = () => {
    setModalData({ type: "routineCreate", data: "" });
  }
  
  return (
    <div className="flex flex-col items-center gap-6 mt-48">
      <div className="flex flex-col items-center gap-1 text-gray-500">
        <p>저장된 루틴이 없습니다.</p>
        <p>루틴을 만들어 바로 운동해보세요!</p>
      </div>
      <div className="w-1/2 p-2 font-semibold text-center text-teal-700 border border-teal-700 rounded-full">
        <button onClick={onRoutineCreateHandler}>루틴 만들기</button>
      </div>
    </div>
  );
};

export default RoutineNoData;
