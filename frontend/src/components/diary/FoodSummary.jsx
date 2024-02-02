import { useRecoilValue } from "recoil";
import { BiSolidBowlRice, BiSolidCheese } from "react-icons/bi";
import { GiMeat } from "react-icons/gi";
import {
  calorieState,
  carbohydrateState,
  lipidState,
  proteinState,
} from "../../recoil/diary/UserFoodState";
import { selectedDateState, selectedDayState } from "../../recoil/diary/SelectedDateState";
import NextButton from "../common/NextButton";
import Description from "./training/Description";

const FoodSummary = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = useRecoilValue(selectedDayState);
  const calorie = useRecoilValue(calorieState);
  const carbohydrate = useRecoilValue(carbohydrateState);
  const protein = useRecoilValue(proteinState);
  const lipid = useRecoilValue(lipidState);

  return (
    <>
      <div className="relative px-4 pt-2 pb-4 border-4 rounded-xl">
        <div className="absolute right-0">
          <NextButton />
        </div>
        <p className="pb-2">
          {selectedDate[1]}월 {selectedDate[2]}일 {selectedDay} - 식단요약{" "}
          <span className="text-sm text-gray-500">총 {calorie}kcal</span>
        </p>
        <div className="grid grid-cols-3 py-4 bg-gray-100 border-white divide-x-4 rounded-xl">
          <div className="flex flex-col items-center">
            <BiSolidBowlRice className="w-6 h-6" />
            <Description Title={carbohydrate + "g"} subTitle={"탄수화물"} />
          </div>
          <div className="flex flex-col items-center">
            <GiMeat className="w-6 h-6" />
            <Description Title={protein + "g"} subTitle={"단백질"} />
          </div>
          <div className="flex flex-col items-center">
            <BiSolidCheese className="w-6 h-6" />
            <Description Title={lipid + "g"} subTitle={"지방"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodSummary;
