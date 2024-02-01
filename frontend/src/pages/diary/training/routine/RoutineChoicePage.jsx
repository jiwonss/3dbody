import { Link } from 'react-router-dom';
import BackButton from '../../../../components/common/BackButton';
import Button from '../../../../components/common/Button';
import PageTitle from "../../../../components/common/PageTitle";

const RoutineChoicePage = () => {
  const test = false
  
  const checkButton = () => {
    return (
      <div>
        {test ?
          <Button buttonName="운동을 선택해주세요." disabled />
          : 
          <Link to={`/diary/training/myroutine/edit`}>
            <Button buttonName="n개의 운동 추가하기" />
          </Link>
        }
      </div>
    );
  };
  
  return (
    <>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="운동 선택하기" />
      <div className='m-4'>
        {checkButton()}
      </div>
    </>
  );
};

export default RoutineChoicePage;
