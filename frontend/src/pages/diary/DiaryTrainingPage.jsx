import { useRecoilValue } from 'recoil';
import PageTitle from "./../../components/common/PageTitle";
import { toggleDiaryState } from '../../recoil/common/ToggleState';
import ToggleTap from './../../components/common/ToggleTap';
import CalendarWeek from './../../components/diary/CalendarWeek';

const DiaryTrainingPage = () => {
  const isSelected = useRecoilValue(toggleDiaryState);
  
  return (
    <>
      <PageTitle pageTitle={"다이어리"} />
      
      <ToggleTap leftTitle={"캘린더"} rightTitle={"그래프"} />
      {isSelected === "left" ? <CalendarWeek /> : ""}
      <hr className="my-4" />
    </>
  )
};

export default DiaryTrainingPage;