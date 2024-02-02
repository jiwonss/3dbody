import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

import PageTitle from "./../../components/common/PageTitle";
import ToggleTap from "./../../components/common/ToggleTap";
import CalendarWeek from "./../../components/diary/CalendarWeek";
import Graph from "../../components/diary/Graph";
import { toggleDiaryState } from "../../recoil/common/ToggleState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userFoodState } from "../../recoil/diary/UserFoodState";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";
import FoodData from '../../components/diary/food/FoodData';
import { userState } from '../../recoil/common/UserState';

const DiaryTrainingPage = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const isSelected = useRecoilValue(toggleDiaryState);
  const baseUrl = useRecoilValue(baseUrlState);
  const [userFood, setUserFood] = useRecoilState(userFoodState);
  const user = useRecoilValue(userState);

  const foodDetailData = () => {
    return (
      <FoodData />
    )
  }

  const getUserFood = async () => { // 식단 데이터 가져오기
    await axios.get(
    `${baseUrl}api/management/food/list/${user.info.userId}?year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`
      ).then(res => {
      setUserFood(res.data)
    }).catch(err => {
      console.log(err)
    })
  };

  useEffect(() => {
    getUserFood();
  }, [selectedDate]);

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
