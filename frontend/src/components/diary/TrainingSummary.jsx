import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { userTrainingState } from "../../recoil/diary/UserTrainingState";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";
import NextButton from "../common/NextButton";
import Description from "./training/Description";

const TrainingSummary = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]);
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeekStr = daysOfWeek[selectedDay.getDay()];
  const userTraining = useRecoilValue(userTrainingState);
  const [isCompleted, setIsCompleted] = useState(true);

  const isCompletedCheck = () => {
    console.log("userTraining 돌면서 is_finished가 모두 true면 true반환");
    return true;
  };

  useEffect(() => {
    setIsCompleted(isCompletedCheck);
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
            <div className='flex gap-10'>
              <ion-icon name="alarm-outline" style={{ 'fontSize': '24px' }}></ion-icon>
              <ion-icon name="barbell-outline" style={{ 'fontSize': '24px' }}></ion-icon>
              <ion-icon name="accessibility-sharp" style={{ 'fontSize': '24px' }}></ion-icon>
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
