import { useRecoilValue } from "recoil";
import { userRoutineState } from "../../../../recoil/diary/UserRoutineState";
import RoutineDetailBox from "./RoutineDetailBox";

const RoutineList = () => {
  const userRoutine = useRecoilValue(userRoutineState);

  return (
    <div className="flex flex-col gap-2">
      {userRoutine.map((data, idx) => {
        return (
          <div key={data.routineId} className="px-4 py-2 bg-gray-200 rounded-lg">
            <RoutineDetailBox data={data} idx={idx}/>
          </div>
      )})}
    </div>
  )
};

export default RoutineList;