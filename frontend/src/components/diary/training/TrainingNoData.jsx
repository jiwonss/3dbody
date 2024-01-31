import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import Button from './../../common/Button';

const TrainingNoData = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]);
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeekStr = daysOfWeek[selectedDay.getDay()];

  return (
    <>
      <div className='m-4'>
        <p>{selectedDate[1]}월 {selectedDate[2]}일 {dayOfWeekStr}</p>
        <p>운동을 직접 계획해보세요!</p>
        <div className='flex justify-center gap-4'>
          <Link to={`/diary/training/load`}>
            <Button buttonName="불러오기" />
          </Link>
          <Link to={`/diary/training/choice`}>
            <Button buttonName="운동 선택하기" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default TrainingNoData;
