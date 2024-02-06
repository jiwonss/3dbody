import { Link } from "react-router-dom";

import BackButton from "./../../../components/common/BackButton";
import PageTitle from "./../../../components/common/PageTitle";
import Input from "./../../../components/common/Input";
import Button from "./../../../components/common/Button";

const RoutineCreatePage = () => {
  return (
    <>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="새로운 루틴 만들기" />

      <div className="flex flex-col gap-2 m-4">
        <p>나만의 루틴을 만들어보세요!</p>
        <Input placeholder={"루틴 이름을 입력하세요"} />
      </div>

      <div className="fixed w-full bottom-16">
        <div className="flex gap-4 m-4">
          <div className="p-2 text-center border border-teal-700 rounded-md basis-1/2">
            <Link to={`/diary/training/load/routine`}>
              <Button buttonName="이전 기록 보기" />
            </Link>
          </div>
          <div className="p-2 text-center text-white bg-teal-700 rounded-md basis-1/2">
            <Link to={`/diary/training/choice/routine`}>
              <Button buttonName="운동 선택하기" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoutineCreatePage;
