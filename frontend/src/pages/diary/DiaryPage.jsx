import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import PageTitle from "./../../components/common/PageTitle";
import CalendarMonth from "./../../components/diary/CalendarMonth";
import Button from "./../../components/common/Button";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";
import ToggleTap from "./../../components/common/ToggleTap";
import { toggleDiaryState } from "../../recoil/common/ToggleState";
import Graph from "./../../components/diary/Graph";


const DiaryPage = () => {
  const day = useRecoilValue(selectedDateState);
  const isSelected = useRecoilValue(toggleDiaryState);

  return (
    <div>
      <PageTitle pageTitle={"다이어리"} />
      <ToggleTap leftTitle={"캘린더"} rightTitle={"그래프"} state={toggleDiaryState} />
      {isSelected === "left" ? <CalendarMonth /> : <Graph />}
      <hr className="my-4" />

      <div className="flex flex-col gap-4 text-center">
        <Link to={`/diary/training/${day[0]}/${day[1]}/${day[2]}`}>
          <Button buttonStyle="large" buttonName="운동 계확하기" />
        </Link>
        <Link to={`/diary/food/${day[0]}/${day[1]}/${day[2]}`}>
          <Button buttonStyle="large" buttonName="식단 관리하기" />
        </Link>
      </div>
    </div>
  );
};

export default DiaryPage;
