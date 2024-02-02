import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';

import PageTitle from './../../../components/common/PageTitle';
import BackButton from './../../../components/common/BackButton';
import Description from './../../../components/diary/training/Description';
import Button from '../../../components/common/Button';
import { selectedDateState } from '../../../recoil/diary/SelectedDateState';

const TrainingLoadPage = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const test = false // 운동선택하면 바뀌게

  const checkButton = () => {
    return (
      <div className='w-full text-center border border-green-500 rounded-lg'>
        {test ?
          <Button buttonName="운동 기록을 선택해주세요." disabled />
          : 
          <Link to={`/diary/training/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`}>
            <Button buttonName="확인" />
          </Link>
        }
      </div>
    );
  };
  
  return (
    <>
      <div className='absolute'>
        <BackButton />
      </div>
      <PageTitle pageTitle={"불러오기"} />
      
      <div className='m-4'>
        <Description size="sm" subsize="xs" />
        <br />
        <p>최근 날짜별 운동기록 표시</p>
        <br />
        {checkButton()}
      </div>
    </>
  )
};

export default TrainingLoadPage;