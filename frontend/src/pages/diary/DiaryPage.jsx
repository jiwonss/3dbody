import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

import PageTitle from "./../../components/common/PageTitle";
import CalendarMonth from "./../../components/diary/CalendarMonth";
import Button from "./../../components/common/Button";
import ToggleTap from "./../../components/common/ToggleTap";
import Graph from "./../../components/diary/Graph";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";
import { toggleDiaryState } from "../../recoil/common/ToggleState";
import { userTrainingState } from "../../recoil/diary/UserTrainingState";
import { userFoodState } from "../../recoil/diary/UserFoodState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import TrainingSummary from '../../components/diary/TrainingSummary';
import FoodSummary from '../../components/diary/FoodSummary';

const DiaryPage = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const isSelected = useRecoilValue(toggleDiaryState);
  const baseUrl = useRecoilValue(baseUrlState);
  const [userTraining, setUserTraining] = useRecoilState(userTrainingState);
  const [userFood, setUserFood] = useRecoilState(userFoodState);

  const trainingData = () => {
    return (
      <Link to={`/diary/training/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`}>
        {!userTraining.length ? (
          <TrainingSummary />
        ) : (
          <Button btnCss="w-full" buttonName="운동 계확하기" />
        )}
      </Link>
    );
  };

  const foodData = () => {
    return (
      <Link to={`/diary/food/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`}>
        {!userFood.length ? (
          <FoodSummary />
        ) : (
          <Button btnCss="w-full" buttonName="식단 관리하기" />
        )}
      </Link>
    );
  };

  // const getUserManagementDay = async () => {
  //   await axios.get(
  //     `${baseUrl}management/calendar/day/${id}?year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`
  //   ).then(res => {
  //     setUserTraining(res)
  //     setUserFood(res)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // };

  useEffect(() => {
    console.log(userTraining);
    console.log(userFood);
    // getUserManagementDay();
  }, [selectedDate]);

  return (
    <div>
      <PageTitle pageTitle={"다이어리"} />
      
      <ToggleTap leftTitle={"캘린더"} rightTitle={"그래프"} state={toggleDiaryState} />
      {isSelected === "left" ? <CalendarMonth /> : <Graph />}
      <hr className="my-4" />

      <div className="flex flex-col gap-4 m-4">
        {trainingData()}
        {foodData()}
      </div>
    </div>
  );
};

export default DiaryPage;
