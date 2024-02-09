import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChallengeDetailInfo from "./ChallengeDetailInfoPage";
import ChallengeDetailComment from "./ChallengeDetailCommentPage";
import BackButton from "./../../components/common/BackButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import PageTitle from "./../../components/common/PageTitle";
import { modalState } from "../../recoil/modal/ModalState";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const [isSelected, setIsSelected] = useState("info");
  const [challenge, setChallenge] = useState({});
  const baseUrl = useRecoilValue(baseUrlState);
  const setModalData = useSetRecoilState(modalState);

  const onChallengeMenuHandler = () => {
    setModalData({ type: "challengeMenu", data: challenge });
  };

  // 정보 선택 함수
  const onClickInfoSelected = () => {
    setIsSelected("info");
  };

  // 댓글 선택 함수
  const onClickCommentSelected = () => {
    setIsSelected("comment");
  };

  // challenge 가져오기
  const getChallenge = async () => {
    const res = (
      await axios.get(`${baseUrl}api/challenge/detail/${challengeId}`)
    ).data;
    setChallenge(res);
  };

  useEffect(() => {
    getChallenge();
  }, []);

  return (
    <div className="mb-16">
      <div className="sticky top-0 bg-white">
        <div className="absolute flex justify-between w-full">
          <BackButton />
          <button onClick={onChallengeMenuHandler}>
            <EllipsisVerticalIcon className="w-6 h-6" />
          </button>
        </div>
        <PageTitle pageTitle={challenge.title} />
        <img src={challenge.image} alt="..." className="w-full h-40" />
        <hr />
        <div className="flex h-10">
          <div
            className={`${
              isSelected === "info" ? "font-bold border-b-teal-700" : null
            } mr-1 ml-4 text-xl flex items-center border-2 border-white`}
            onClick={() => onClickInfoSelected()}
          >
            정보
          </div>
          <div
            className={`${
              isSelected === "comment"
                ? "font-bold border-b-teal-700"
                : "text-gray-600"
            } text-xl ml-1 flex items-center border-2 border-white`}
            onClick={() => onClickCommentSelected()}
          >
            댓글
          </div>
        </div>
      </div>
      <hr />
      {isSelected === "info" ? (
        <ChallengeDetailInfo />
      ) : (
        <ChallengeDetailComment />
      )}
    </div>
  );
};

export default ChallengeDetail;
