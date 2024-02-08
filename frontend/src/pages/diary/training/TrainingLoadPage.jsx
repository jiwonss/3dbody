import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import PageTitle from "./../../../components/common/PageTitle";
import BackButton from "./../../../components/common/BackButton";
import Description from "./../../../components/diary/training/Description";
import Button from "../../../components/common/Button";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import { userHistoryState } from "../../../recoil/diary/UserHistoryState";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { userState } from "../../../recoil/common/UserState";
import HistoryList from "../../../components/diary/training/history/HistoryList";
import HistoryNoData from "../../../components/diary/training/history/HistoryNoData";

const TrainingLoadPage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const isSelected = true; // 운동선택하면 바뀌게
  const { basepage } = useParams();
  const [userHistory, setUserHistory] = useRecoilState(userHistoryState);

  const checkButton = () => {
    return (
      <div
        className={`p-2 text-center border-teal-700 rounded-md ${
          isSelected ? " bg-teal-700 text-white" : "border"
        }`}
      >
        {isSelected ? (
          <Link
            to={
              basepage === "basic"
                ? `/diary/training/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`
                : `/diary/training/myroutine/edit/create`
            }
          >
            <Button buttonName="확인" />
          </Link>
        ) : (
          <Button buttonName="운동 기록을 선택해주세요." disabled />
        )}
      </div>
    );
  };

  // 유저 운동 기록 가져오기
  const getUserHistory = async () => {
    await axios
      .get(`${baseUrl}api/management/training/user/${user.info.userId}`)
      .then((res) => {
        console.table("운동기록 : ", res.data);
        setUserHistory(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserHistory();
  }, []);

  return (
    <>
      {/* 스크롤 시 고정용 sticky */}
      <div className="sticky top-0 bg-white">
        <div className="absolute">
          <BackButton />
        </div>
        <PageTitle
          pageTitle={`${basepage === "basic" ? "불러오기" : "전체 운동 기록"}`}
        />

        <div className="p-4">
          <Description size="base" subsize="sm" />
        </div>
      </div>
      {/* 운동기록 표시 */}
      <div className="mx-4 mb-32">
        {userHistory.length ? <HistoryList /> : <HistoryNoData />}
      </div>
      {/* 바텀 버튼 */}
      <div className="fixed w-full bg-white bottom-[57px]">
        <div className="m-4">{checkButton()}</div>
      </div>
    </>
  );
};

export default TrainingLoadPage;
