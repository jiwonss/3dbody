import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PageTitle from "./../../../components/common/PageTitle";
import Button from "../../../components/common/Button";
import { selectedRoutineState } from "../../../recoil/diary/SelectedRoutineState";
import { userRoutineState } from "../../../recoil/diary/UserRoutineState";
import Input from "../../../components/common/Input";

const RoutineEditPage = () => {
  const { basepage } = useParams();
  const selectedRoutine = useRecoilValue(selectedRoutineState);
  const userRoutine = useRecoilState(userRoutineState);
  const [name, setName] = useState(userRoutine?.name);

  const onClickBtn = () => {
    basepage === "basic"
      ? console.log("루틴 수정요청 보내기")
      : console.log("루틴 생성요청 보내기");
  };

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  return (
    <>
      <div className="absolute right-0">
        <XMarkIcon className="w-6 h-6 my-4 mr-2" />
      </div>
      <PageTitle pageTitle="루틴 편집" />
      <div className="m-4">
        <Input value={name} onChange={() => onChangeName()}/>
      </div>

      <div className="fixed w-full bottom-16">
        <div className="p-2 m-4 text-center text-white bg-teal-700 rounded-md">
          <Link to={`/diary/training/myroutine`}>
            <Button buttonName="루틴으로 저장하기" onClick={() => onClickBtn()} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoutineEditPage;
