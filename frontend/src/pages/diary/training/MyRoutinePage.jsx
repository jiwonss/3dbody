import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import PageTitle from "./../../../components/common/PageTitle";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import { userRoutineState } from "../../../recoil/diary/UserRoutineState";
import RoutineNoData from "../../../components/diary/training/routine/RoutineNoData";
import RoutineList from "../../../components/diary/training/routine/RoutineList";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { userState } from "../../../recoil/common/UserState";
import { modalState } from "../../../recoil/modal/ModalState";

const MyRoutinePage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const navigate = useNavigate();
  const [userRoutine, setUserRoutine] = useRecoilState(userRoutineState);
  const [modalData, setModalData] = useRecoilState(modalState);

  // 뒤로가기 버튼
  const onBackBtnHandler = () => {
    navigate(
      `/diary/training/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`
    );
  };

  // 루틴 생성 모달
  const onRoutineCreateHandler = () => {
    setModalData({ type: "routineCreate", data: "" });
  };

  // 유저 루틴 목록 가져오기
  const getUserRoutine = async () => {
    await axios
      .get(`${baseUrl}api/management/routine/${user.info.userId}`)
      .then((res) => {
        setUserRoutine(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserRoutine();
  }, [modalData]);

  return (
    <>
      <div className="absolute my-4">
        <ChevronLeftIcon
          className="w-6 h-6 ml-2"
          onClick={onBackBtnHandler}
        />
      </div>
      <PageTitle pageTitle="나만의 루틴" />

      <div className="flex flex-col gap-4 m-4">
        <div className="flex justify-between">
          <p>전체 {userRoutine.length}개</p>
          <button onClick={onRoutineCreateHandler}>
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>

        {userRoutine.length ? <RoutineList /> : <RoutineNoData />}
      </div>
    </>
  );
};

export default MyRoutinePage;
