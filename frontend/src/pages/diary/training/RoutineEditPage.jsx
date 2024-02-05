import { Link, useParams } from 'react-router-dom';
import BackButton from "./../../../components/common/BackButton";
import PageTitle from "./../../../components/common/PageTitle";
import Button from '../../../components/common/Button';
import { useRecoilValue } from 'recoil';
import { selectedRoutineState } from '../../../recoil/diary/SelectedRoutineState';

const RoutineEditPage = () => {
  const { basepage } = useParams();
  const selectedRoutine = useRecoilValue(selectedRoutineState);

  const onClickBtn = () => {
    basepage === "basic" ?
    console.log("루틴 수정요청 보내기")
      :
      console.log("루틴 생성요청 보내기")
  };

  return (
    <>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="루틴 편집" />
      
      <div className='fixed w-full bottom-16'>
        <div className='p-2 m-4 text-center text-white bg-teal-700 rounded-md'>
          <Link to={`/diary/training/myroutine`}>
            <Button buttonName="루틴으로 저장하기" onClick={() => onClickBtn()}/>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoutineEditPage;
