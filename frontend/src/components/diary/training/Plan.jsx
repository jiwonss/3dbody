import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Description from './Description';
import Button from '../../common/Button';
import NextButton from '../../common/NextButton';
import { selectedDateState, selectedDayState } from '../../../recoil/diary/SelectedDateState';
import { isRestState } from '../../../recoil/diary/IsRestState';


const Plan = () => {
  const setIsRest = useSetRecoilState(isRestState);
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = useRecoilValue(selectedDayState);

  
  const onClickHandler = () => {
    setIsRest(true)
  }
  
  return (
    <div className="flex flex-col gap-4 m-4">
      <div>
        <Description
          Title={`${selectedDate[1]}월 ${selectedDate[2]}일 ${selectedDay}`}
          subTitle={"운동을 직접 계획해보세요!"}
        />
      <div className="flex justify-center gap-4 my-4">
        <Link to={`/diary/training/load`}>
          <Button buttonName="불러오기" />
        </Link>
        <Link to={`/diary/training/choice`}>
          <Button buttonName="운동 선택하기" />
        </Link>
      </div>
    </div>

    <div className="relative">
      <Link to={`/diary/training/myroutine`}>
        <div className="absolute right-0">
          <NextButton />
        </div>
        <Description Title={"나만의 루틴"} subTitle={"루틴을 선택해주세요."} />
      </Link>
    </div>

    <div className="text-center">
      <p onClick={onClickHandler} className="text-base text-gray-500 underline">오늘은 쉴래요! 😥</p>
    </div>
  </div>
  );
};

export default Plan;
