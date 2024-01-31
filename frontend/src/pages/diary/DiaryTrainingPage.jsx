import axios from "axios";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import PageTitle from "./../../components/common/PageTitle";
import { toggleDiaryState } from "../../recoil/common/ToggleState";
import ToggleTap from "./../../components/common/ToggleTap";
import CalendarWeek from "./../../components/diary/CalendarWeek";
import Graph from "../../components/diary/Graph";
import { baseUrlState } from "../../recoil/common/BaseUrlState";

const DiaryTrainingPage = () => {
  const isSelected = useRecoilValue(toggleDiaryState);
  const { year, month, date } = useParams();
  const baseUrl = useRecoilValue(baseUrlState);

  // const getUserTraining = async () => {
  //   const res = (await axios.get(`${baseUrl}api/user/training/${year}/${month}/${date}`)).data;
  //   console.log(res);
  // };

  return (
    <>
      <PageTitle pageTitle={"다이어리"} />

      <ToggleTap leftTitle={"캘린더"} rightTitle={"그래프"} state={toggleDiaryState} />
      {isSelected === "left" ? <CalendarWeek /> : <Graph />}
      <hr className="my-4" />
    </>
  );
};

export default DiaryTrainingPage;
