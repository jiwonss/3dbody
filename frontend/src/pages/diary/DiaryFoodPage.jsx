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

const DiaryTrainingPage = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const isSelected = useRecoilValue(toggleDiaryState);
  const baseUrl = useRecoilValue(baseUrlState);
  const [userFood, setUserFood] = useRecoilState(userFoodState);

  const foodDetailData = () => {
    return (
      "음식 컴포넌트 만들어서 출력"
    )
  }

  // const getUserFood = async () => {
  //   await axios.get(
  //     `${baseUrl}api/user/food/${day[0]}/${day[1]}/${day[2]}` 페이크주소임
  //   ).then(res => {
  //     setUserFood(res)
  //   }).catch(err => {
  //     console.log(err)
  //     setUserFood([])
  //   })
  // };

  useEffect(() => {
    console.log(userFood);
    // getUserFood();
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
