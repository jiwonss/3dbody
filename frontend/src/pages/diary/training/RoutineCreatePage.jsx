import { Link } from 'react-router-dom';

import BackButton from './../../../components/common/BackButton';
import PageTitle from './../../../components/common/PageTitle';
import Input from './../../../components/common/Input';
import Button from './../../../components/common/Button';

const RoutineCreatePage = () => {
  return (
    <>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="새로운 루틴 만들기" />

      <div className='m-4'>
        <p>나만의 루틴을 만들어보세요!</p>
        <Input placeholder={"  루틴 이름을 입력하세요"} />
      </div>

      <div className="flex justify-between m-4 mt-auto">
        <Link to={`/diary/training/myroutine/load`}>
          <Button buttonName="이전 기록 보기" />
        </Link>
        <Link to={`/diary/training/myroutine/choice`}>
          <Button buttonName="운동 선택하기" />
        </Link>
      </div>
    </>
  )
};

export default RoutineCreatePage;