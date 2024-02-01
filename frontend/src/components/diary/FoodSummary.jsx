import { useRecoilValue } from "recoil";
import { userFoodState } from '../../recoil/diary/UserFoodState';
import { selectedDateState } from "../../recoil/diary/SelectedDateState";
import NextButton from "../common/NextButton";

const FoodSummary = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]);
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeekStr = daysOfWeek[selectedDay.getDay()];
  const userFood = useRecoilValue(userFoodState);

  return (
    <>
      <div className="relative">
        <div className="absolute right-0">
          <NextButton />
        </div>
        <p>
          {selectedDate[1]}월 {selectedDate[2]}일 {dayOfWeekStr} - 식단요약
        </p>
        <div className="flex flex-col items-center m-4">
          <p>식단요약 데이터 보여주기</p>
        </div>
      </div>
    </>
  );
};

export default FoodSummary;
