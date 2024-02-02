import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";

import PageTitle from "./../../components/common/PageTitle";
import ToggleTap from "./../../components/common/ToggleTap";
import CalendarWeek from "./../../components/diary/CalendarWeek";
import Graph from "../../components/diary/Graph";
import { toggleDiaryState } from "../../recoil/common/ToggleState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import {
  calorieState,
  carbohydrateState,
  lipidState,
  proteinState,
  userFoodState,
} from "../../recoil/diary/UserFoodState";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";
import FoodData from "../../components/diary/food/FoodData";
import { userState } from "../../recoil/common/UserState";

const DiaryTrainingPage = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const isSelected = useRecoilValue(toggleDiaryState);
  const baseUrl = useRecoilValue(baseUrlState);
  const [userFood, setUserFood] = useRecoilState(userFoodState);
  const user = useRecoilValue(userState);
  const setCalorie = useSetRecoilState(calorieState);
  const setCarbohydrate = useSetRecoilState(carbohydrateState);
  const setProtein = useSetRecoilState(proteinState);
  const setLipid = useSetRecoilState(lipidState);

  const foodDetailData = () => {
    return <FoodData />;
  };

  const getUserFood = async () => {
    // 식단 데이터 가져오기
    await axios
      .get(
        `${baseUrl}api/management/food/list/${user.info.userId}?year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`
      )
      .then((res) => {
        setUserFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserFood();
  }, [selectedDate]);

  useEffect(() => {
    setCalorie(
      userFood
        .reduce((acc, cur) => {
          return acc + cur.food.calorie;
        }, 0)
        .toFixed(1)
    );
    setCarbohydrate(
      userFood
        .reduce((acc, cur) => {
          return acc + cur.food.carbohydrate;
        }, 0)
        .toFixed(1)
    );
    setProtein(
      userFood
        .reduce((acc, cur) => {
          return acc + cur.food.protein;
        }, 0)
        .toFixed(1)
    );
    setLipid(
      userFood
        .reduce((acc, cur) => {
          return acc + cur.food.lipid;
        }, 0)
        .toFixed(1)
    );
  }, [userFood]);

  return (
    <>
      <PageTitle pageTitle={"다이어리"} />

      <ToggleTap leftTitle={"캘린더"} rightTitle={"그래프"} state={toggleDiaryState} />
      {isSelected === "left" ? <CalendarWeek /> : <Graph />}
      <hr className="my-4" />
      {foodDetailData()}
    </>
  );
};

export default DiaryTrainingPage;
