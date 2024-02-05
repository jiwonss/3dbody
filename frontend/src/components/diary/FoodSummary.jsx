import { useRecoilValue } from "recoil";
import { BiSolidBowlRice, BiSolidCheese } from "react-icons/bi";
import { GiMeat } from "react-icons/gi";
import { userFoodState } from "../../recoil/diary/UserFoodState";
import {
  selectedDateState,
  selectedDayState,
} from "../../recoil/diary/SelectedDateState";
import NextButton from "../common/NextButton";
import Description from "./training/Description";

const FoodSummary = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = useRecoilValue(selectedDayState);
  const userFood = useRecoilValue(userFoodState);

  const totalcalorie = userFood
    .reduce((acc, cur) => {
      return acc + (cur.food.calorie * (cur.servingSize / cur.food.servingSize) * cur.foodCount);
    }, 0)
    .toFixed(1);

  const totalcarbohydrate = userFood
    .reduce((acc, cur) => {
      return acc + (cur.food.carbohydrate * (cur.servingSize / cur.food.servingSize) * cur.foodCount);
    }, 0)
    .toFixed(1);

  const totalprotein = userFood
    .reduce((acc, cur) => {
      return acc + (cur.food.protein * (cur.servingSize / cur.food.servingSize) * cur.foodCount);
    }, 0)
    .toFixed(1);

  const totallipid = userFood
    .reduce((acc, cur) => {
      return acc + (cur.food.lipid * (cur.servingSize / cur.food.servingSize) * cur.foodCount);
    }, 0)
    .toFixed(1);

  return (
    <>
      <div className="relative px-4 pt-2 pb-4 border-4 rounded-xl">
        <div className="absolute right-2">
          <NextButton />
        </div>
        <p className="pb-2">
          {selectedDate[1]}월 {selectedDate[2]}일 {selectedDay} - 식단요약{" "}
          <span className="text-sm text-gray-500">총 {totalcalorie}kcal</span>
        </p>
        <div className="grid grid-cols-3 py-4 bg-gray-100 border-white divide-x-4 rounded-xl">
          <div className="flex flex-col items-center">
            <BiSolidBowlRice className="w-6 h-6" />
            <Description
              Title={totalcarbohydrate + "g"}
              subTitle={"탄수화물"}
            />
          </div>
          <div className="flex flex-col items-center">
            <GiMeat className="w-6 h-6" />
            <Description Title={totalprotein + "g"} subTitle={"단백질"} />
          </div>
          <div className="flex flex-col items-center">
            <BiSolidCheese className="w-6 h-6" />
            <Description Title={totallipid + "g"} subTitle={"지방"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodSummary;
