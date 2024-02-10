import { useRecoilValue } from "recoil";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { BsAlarm } from "react-icons/bs";
import { FaDumbbell } from "react-icons/fa6";
import { GiMuscleUp } from "react-icons/gi";

import { userTrainingState } from "../../recoil/diary/UserTrainingState";
import {
  selectedDateState,
  selectedDayState,
} from "../../recoil/diary/SelectedDateState";
import NextButton from "../common/NextButton";
import Description from "./training/Description";

const TrainingSummary = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = useRecoilValue(selectedDayState);
  const userTraining = useRecoilValue(userTrainingState);

  const trainingTime = () => {
    return localStorage.getItem(`date_${selectedDate.join("-")}`);
  };

  const trainingCount = () => {
    return userTraining.length;
  };

  const totalVolume = () => {
    return userTraining.reduce((acc, cur) => {
      return (
        acc +
        cur.sets.reduce((acc, cur) => {
          return acc + cur.count * cur.kg;
        }, 0)
      );
    }, 0);
  };

  // 해당 날짜 계획한 운동 완료 여부
  const isCompletedCheck = () => {
    let allSetsCompleted = true;

    userTraining.forEach((data) => {
      data.sets.forEach((set) => {
        if (set.is_finished === false) {
          allSetsCompleted = false;
          return;
        }
      });
    });

    return allSetsCompleted;
  };

  return (
    <>
      <div className="relative px-4 pt-2 pb-4 border-4 rounded-xl">
        <div className="absolute right-2">
          <NextButton />
        </div>
        <p className="pb-2">
          {selectedDate[1]}월 {selectedDate[2]}일 {selectedDay} - 운동요약
        </p>
        {isCompletedCheck() ? (
          <div className="grid grid-cols-3 py-4 bg-gray-100 border-white divide-x-4 rounded-xl">
            <div className="flex flex-col items-center">
              <BsAlarm className="w-6 h-6" />
              <Description
                Title={`${trainingTime()}분`}
                subTitle={"운동 시간"}
              />
            </div>
            <div className="flex flex-col items-center">
              <FaDumbbell className="w-6 h-6" />
              <Description
                Title={`${trainingCount()}개`}
                subTitle={"운동 개수"}
              />
            </div>
            <div className="flex flex-col items-center">
              <GiMuscleUp className="w-6 h-6" />
              <Description
                Title={`${totalVolume()}kg`}
                subTitle={"전체 볼륨"}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center m-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
            <Description
              Title={"아직 완료되지 않은 운동입니다."}
              size={"sm"}
              subTitle={"정보 확인을 위해 운동을 완료해주세요!"}
              subsize={"xs"}
              font={"medium"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TrainingSummary;
