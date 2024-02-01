import { useRecoilValue } from "recoil";
import { userTrainingState } from "../../recoil/diary/UserTrainingState";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";
import NextButton from "../common/NextButton";
import Description from "./training/Description";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const TrainingSummary = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]);
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeekStr = daysOfWeek[selectedDay.getDay()];
  const userTraining = useRecoilValue(userTrainingState);
  const [isCompleted, setIsCompleted] = useState(false);

  const isCompletedCheck = () => {
    console.log("userTraining 돌면서 is_finished가 모두 true면 true반환");
    return false;
  };

  useEffect(() => {
    setIsCompleted(isCompleted);
  }, [userTraining]);

  return (
    <>
      <div className="relative">
        <div className="absolute right-0">
          <NextButton />
        </div>
        <p>
          {selectedDate[1]}월 {selectedDate[2]}일 {dayOfWeekStr} - 운동요약
        </p>
        <div className="flex flex-col items-center m-4">
          {isCompleted ? (
            <div>
              <p>운동요약 데이터 보여주기</p>
            </div>
          ) : (
            <>
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
              <Description
                Title={"아직 완료되지 않은 운동입니다."}
                size={"sm"}
                subTitle={"정보 확인을 위해 운동을 완료해주세요!"}
                subsize={"xs"}
                font={"medium"}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TrainingSummary;
