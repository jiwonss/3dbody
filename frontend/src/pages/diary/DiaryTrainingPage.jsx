import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

import PageTitle from "./../../components/common/PageTitle";
import ToggleTap from "./../../components/common/ToggleTap";
import CalendarWeek from "./../../components/diary/CalendarWeek";
import Graph from "../../components/diary/Graph";
import { toggleDiaryState } from "../../recoil/common/ToggleState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userTrainingState } from "../../recoil/diary/UserTrainingState";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";
import TrainingNoData from "../../components/diary/training/trainingNoData";

const DiaryTrainingPage = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const isSelected = useRecoilValue(toggleDiaryState);
  const baseUrl = useRecoilValue(baseUrlState);
  const [userTraining, setUserTraining] = useRecoilState(userTrainingState);

  const trainingDetailData = () => {
    return userTraining.length ? "운동 데이터 있다" : <TrainingNoData />;
  };

  // const getUserManagementDay = async () => {
  //   await axios.get(
  //     `${baseUrl}management/calendar/day/${id}?year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`
  //   ).then(res => {
  //     setUserTraining(res)
  //   }).catch(err => {
  //     console.log(err)
  //     setUserTraining([])
  //   })
  // };

  useEffect(() => {
    console.log(userTraining);
    // getUserManagementDay();
  }, [selectedDate]);

  return (
    <>
      <PageTitle pageTitle={"다이어리"} />

      <ToggleTap leftTitle={"캘린더"} rightTitle={"그래프"} state={toggleDiaryState} />
      {isSelected === "left" ? <CalendarWeek /> : <Graph />}
      <hr className="my-4" />
      {trainingDetailData()}
    </>
  );
};

export default DiaryTrainingPage;
