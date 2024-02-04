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
      return acc + cur.food.calorie;
    }, 0)
    .toFixed(1);

  const totalcarbohydrate = userFood
    .reduce((acc, cur) => {
      return acc + cur.food.carbohydrate;
    }, 0)
    .toFixed(1);

  const totalprotein = userFood
    .reduce((acc, cur) => {
      return acc + cur.food.protein;
    }, 0)
    .toFixed(1);

  const totallipid = userFood
    .reduce((acc, cur) => {
      return acc + cur.food.lipid;
    }, 0)
    .toFixed(1);

  const breakfast = userFood.filter((data) => data.category === "아침");
  const lunch = userFood.filter((data) => data.category === "점심");
  const dinner = userFood.filter((data) => data.category === "저녁");
  const other = userFood.filter((data) => data.category === "기타");

  return (
    <div className="flex flex-col gap-2 m-4 mb-16">
      <p className="font-semibold">
        {selectedDate[1]}월 {selectedDate[2]}일 {selectedDay} - 식단
      </p>
      <div className="px-4 py-2 border rounded-xl">
        <div className="grid grid-cols-3 divide-x-4 font-semibold">
          <p className="text-center">총 칼로리</p>
          <p className="text-center">{totalcalorie} kcal</p>
        </div>
      </div>
      <div className="grid grid-cols-3 p-4 border divide-x-4 rounded-xl">
        <div className="flex flex-col items-center">
          <BiSolidBowlRice className="w-6 h-6" />
          <Description Title={totalcarbohydrate + "g"} subTitle={"탄수화물"} />
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
      <FoodByCategory category={"아침 식사"} data={breakfast} />
      <FoodByCategory category={"점심 식사"} data={lunch} />
      <FoodByCategory category={"저녁 식사"} data={dinner} />
      <FoodByCategory category={"기타 식사"} data={other} />
    </div>
  );
};

export default FoodData;
