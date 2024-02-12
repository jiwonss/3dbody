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
import TrainingNoData from "../../components/diary/training/TrainingNoData";
import TrainingData from "./../../components/diary/training/TrainingData";
import { userState } from "../../recoil/common/UserState";

const DiaryTrainingPage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const isSelected = useRecoilValue(toggleDiaryState);
  const [userTraining, setUserTraining] = useRecoilState(userTrainingState);
  
  // 운동 데이터 가져오기
  const getUserTraining = async () => {
    await axios
      .get(
        `${baseUrl}api/management/training?user_id=${user.info.userId}&year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`
      )
      .then((res) => {
        console.log(res.data);
        setUserTraining(res.data.user_training_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserTraining();
  }, [selectedDate]);

  return (
    <div className='bg-[#C9DECF]/30'>
      <div className="sticky top-0 bg-white">
        <PageTitle pageTitle={"다이어리"} />

        <ToggleTap leftTitle={"캘린더"} rightTitle={"그래프"} state={toggleDiaryState} />
        {isSelected === "left" ? <CalendarWeek /> : <Graph />}
        <hr className="mt-4" />
      </div>
      {userTraining.length ? <TrainingData /> : <TrainingNoData />}
    </div>
  );
};

export default DiaryTrainingPage;
