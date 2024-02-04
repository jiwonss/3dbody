import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import PageTitle from "./../../../components/common/PageTitle";
import { useRecoilValue } from "recoil";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";

const MyRoutinePage = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate(`/diary/training/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`);
  };

  return (
    <>
      <div className="absolute my-4">
        <ChevronLeftIcon className="w-6 h-6 text-blue-500" onClick={onClickBtn} />
      </div>
      <PageTitle pageTitle="나만의 루틴" />

      <div className="flex flex-col gap-4 m-4">
        <div className="flex justify-between">
          <p>ex : 전체 2개</p>
          <Link to={`/diary/training/myroutine/create`}>
            <PlusIcon className="w-6 h-6" />
          </Link>
        </div>

        <div>axios 요청 후 루틴 리스트 출력</div>
      </div>
    </>
  );
};

export default MyRoutinePage;
