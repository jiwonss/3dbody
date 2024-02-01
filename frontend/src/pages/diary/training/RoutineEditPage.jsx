import { Link } from 'react-router-dom';
import BackButton from "./../../../components/common/BackButton";
import PageTitle from "./../../../components/common/PageTitle";
import Button from '../../../components/common/Button';
import { useRecoilValue } from 'recoil';
import { RoutineState } from '../../../recoil/diary/RoutineState';

const RoutineEditPage = () => {
  const routine = useRecoilValue(RoutineState);
  const isRoutineId = routine?.id ? true : false;

  const onClickBtn = () => {
    isRoutineId ?
      "루틴 수정요청 보내기"
      :
      console.log("루틴 생성요청 보내기")
  };

  return (
    <>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="루틴 편집" />
      <div className='m-4'>
        <Link to={`/diary/training/myroutine`}>
          <Button buttonName="확인" onClick={() => onClickBtn()}/>
        </Link>
      </div>
    </>
  );
};

export default RoutineEditPage;
