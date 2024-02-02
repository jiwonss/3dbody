import { useRecoilValue } from "recoil";
import { BiSolidBowlRice, BiSolidCheese } from "react-icons/bi";
import { GiMeat } from "react-icons/gi";
import {
  calorieState,
  carbohydrateState,
  lipidState,
  proteinState,
  userFoodState,
} from "../../../recoil/diary/UserFoodState";
import { selectedDateState, selectedDayState } from "../../../recoil/diary/SelectedDateState";
import Description from "../training/Description";

const FoodData = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = useRecoilValue(selectedDayState);
  const userFood = useRecoilValue(userFoodState);
  const calorie = useRecoilValue(calorieState);
  const carbohydrate = useRecoilValue(carbohydrateState);
  const protein = useRecoilValue(proteinState);
  const lipid = useRecoilValue(lipidState);
  const breakfast = userFood.filter((data) => data.category === "아침");
  const lunch = userFood.filter((data) => data.category === "점심");
  const dinner = userFood.filter((data) => data.category === "저녁");
  const other = userFood.filter((data) => data.category === "기타");

  return (
    <div className="flex flex-col gap-4 m-4">
      <p className="font-semibold">
        {selectedDate[1]}월 {selectedDate[2]}일 {selectedDay} - 식단
      </p>
      <div className="p-4 border rounded-xl">
        <div className="grid grid-cols-3 divide-x-4">
          <p className="text-center">총 칼로리</p>
          <p className="text-center">{calorie} kcal</p>
        </div>
      </div>
      <div className="grid grid-cols-3 p-4 border divide-x-4 rounded-xl">
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
      <div className="p-4 border rounded-xl">
        <Description
          Title={"아침 식사"}
          subTitle={`${breakfast.reduce((acc, cur) => {
            return acc + cur.food.calorie;
          }, 0).toFixed(1)}kcal / ${breakfast.reduce((acc, cur) => {
            return acc + cur.food.carbohydrate;
          }, 0).toFixed(1)}g / ${breakfast.reduce((acc, cur) => {
            return acc + cur.food.protein;
          }, 0).toFixed(1)}g / ${breakfast.reduce((acc, cur) => {
            return acc + cur.food.lipid;
          }, 0).toFixed(1)}g`}
        />
      </div>
      <div className="p-4 border rounded-xl">
        <Description
          Title={"점심 식사"}
          subTitle={`${lunch.reduce((acc, cur) => {
            return acc + cur.food.calorie;
          }, 0).toFixed(1)}kcal / ${lunch.reduce((acc, cur) => {
            return acc + cur.food.carbohydrate;
          }, 0).toFixed(1)}g / ${lunch.reduce((acc, cur) => {
            return acc + cur.food.protein;
          }, 0).toFixed(1)}g / ${lunch.reduce((acc, cur) => {
            return acc + cur.food.lipid;
          }, 0).toFixed(1)}g`}
        />
      </div>
      <div className="p-4 border rounded-xl">
        <Description
          Title={"저녁 식사"}
          subTitle={`${dinner.reduce((acc, cur) => {
            return acc + cur.food.calorie;
          }, 0).toFixed(1)}kcal / ${dinner.reduce((acc, cur) => {
            return acc + cur.food.carbohydrate;
          }, 0).toFixed(1)}g / ${dinner.reduce((acc, cur) => {
            return acc + cur.food.protein;
          }, 0).toFixed(1)}g / ${dinner.reduce((acc, cur) => {
            return acc + cur.food.lipid;
          }, 0).toFixed(1)}g`}
        />
      </div>
      <div className="p-4 border rounded-xl">
        <Description
          Title={"기타"}
          subTitle={`${other.reduce((acc, cur) => {
            return acc + cur.food.calorie;
          }, 0).toFixed(1)}kcal / ${other.reduce((acc, cur) => {
            return acc + cur.food.carbohydrate;
          }, 0).toFixed(1)}g / ${other.reduce((acc, cur) => {
            return acc + cur.food.protein;
          }, 0).toFixed(1)}g / ${other.reduce((acc, cur) => {
            return acc + cur.food.lipid;
          }, 0).toFixed(1)}g`}
        />
      </div>
    </div>
  );
};

export default FoodData;
