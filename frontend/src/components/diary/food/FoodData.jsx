import { useRecoilValue } from "recoil";
import { BiSolidBowlRice, BiSolidCheese } from "react-icons/bi";
import { GiMeat } from "react-icons/gi";
import {
  selectedDateState,
  selectedDayState,
} from "../../../recoil/diary/SelectedDateState";
import { userFoodState } from "../../../recoil/diary/UserFoodState";
import Description from "../training/Description";
import FoodByCategory from "./FoodByCategory";

const FoodData = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = useRecoilValue(selectedDayState);
  const userFood = useRecoilValue(userFoodState);

  const totalcalorie = userFood
    .reduce((acc, cur) => {
      return (
        acc +
        cur.food.calorie *
          (cur.servingSize / cur.food.servingSize) *
          cur.foodCount
      );
    }, 0)
    .toFixed(1);

  const totalcarbohydrate = userFood
    .reduce((acc, cur) => {
      return (
        acc +
        cur.food.carbohydrate *
          (cur.servingSize / cur.food.servingSize) *
          cur.foodCount
      );
    }, 0)
    .toFixed(1);

  const totalprotein = userFood
    .reduce((acc, cur) => {
      return (
        acc +
        cur.food.protein *
          (cur.servingSize / cur.food.servingSize) *
          cur.foodCount
      );
    }, 0)
    .toFixed(1);

  const totallipid = userFood
    .reduce((acc, cur) => {
      return (
        acc +
        cur.food.lipid *
          (cur.servingSize / cur.food.servingSize) *
          cur.foodCount
      );
    }, 0)
    .toFixed(1);

  const breakfast = userFood.filter((data) => data.category === "아침");
  const lunch = userFood.filter((data) => data.category === "점심");
  const dinner = userFood.filter((data) => data.category === "저녁");
  const other = userFood.filter((data) => data.category === "기타");

  return (
    <div className="flex flex-col gap-2 pt-2 mx-4 mb-16">
      <p className="font-semibold">
        {selectedDate[1]}월 {selectedDate[2]}일 {selectedDay} - 식단
      </p>
      <div className="px-4 py-2 bg-white border-white rounded-xl">
        <div className="grid grid-cols-3 font-semibold divide-x-4">
          <p className="text-center">총 칼로리</p>
          <p className="text-center">{totalcalorie} kcal</p>
        </div>
      </div>
      <div className="grid grid-cols-3 py-4 bg-white border-white divide-x-4 rounded-xl">
        <div className="relative flex flex-col items-center">
          <div className="absolute w-[88px] h-[88px] bg-[#E9E1D4]/30 rounded-full top-[-10px]"></div>
          <BiSolidBowlRice className="w-6 h-6" />
          <Description Title={totalcarbohydrate + "g"} subTitle={"탄수화물"} />
        </div>
        <div className="relative flex flex-col items-center">
          <div className="absolute w-[88px] h-[88px] bg-[#F5DDAD]/30 rounded-full top-[-10px]"></div>
          <GiMeat className="w-6 h-6" />
          <Description Title={totalprotein + "g"} subTitle={"단백질"} />
        </div>
        <div className="relative flex flex-col items-center">
          <div className="absolute w-[88px] h-[88px] bg-[#F1BCAE]/30 rounded-full top-[-10px]"></div>
          <BiSolidCheese className="w-6 h-6" />
          <Description Title={totallipid + "g"} subTitle={"지방"} />
        </div>
      </div>
      <FoodByCategory category={"🍎 아침 식사"} data={breakfast} />
      <FoodByCategory category={"☀️ 점심 식사"} data={lunch} />
      <FoodByCategory category={"🌙 저녁 식사"} data={dinner} />
      <FoodByCategory category={"🍪 기타 식사"} data={other} />
    </div>
  );
};

export default FoodData;
