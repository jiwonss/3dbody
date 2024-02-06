import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from 'react';

import PageTitle from "./../../../components/common/PageTitle";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import { userRoutineState } from "../../../recoil/diary/UserRoutineState";
import RoutineNoData from '../../../components/diary/training/routine/RoutineNoData';
import RoutineList from '../../../components/diary/training/routine/RoutineList';

const MyRoutinePage = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const navigate = useNavigate();
  const [userRoutine, setUserRoutine] = useRecoilState(userRoutineState);

  const onClickBtn = () => {
    navigate(`/diary/training/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`);
  };

  useEffect(() => {
    console.log("유저 루틴 들고오기")
  }, [])

  return (
    <>
      <div className="absolute my-4">
        <ChevronLeftIcon className="w-6 h-6 text-blue-500" onClick={onClickBtn} />
      </div>
      <PageTitle pageTitle="나만의 루틴" />

      <div className="flex flex-col gap-4 m-4">
        <div className="flex justify-between">
          <p>전체 { userRoutine.length }개</p>
          <Link to={`/diary/training/myroutine/create`}>
            <PlusIcon className="w-6 h-6" />
          </Link>
        </div>

        { userRoutine.length ? <RoutineList /> : <RoutineNoData /> }
      </div>
    </>
  );
};

export default MyRoutinePage;
