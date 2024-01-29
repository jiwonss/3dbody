import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChallengeDetailInfo from "./ChallengeDetailInfoPage";
import ChallengeDetailComment from './ChallengeDetailCommentPage';
import BackButton from './../../components/common/BackButton';

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const [isSelected, setIsSelected] = useState("info");
  const [challenge, setChallenge] = useState({});

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
      await axios.get(
        `http://i10c204.p.ssafy.io:8082/api/challenge/detail/${challengeId}`
      )
    ).data;
    setChallenge(res);
    console.log(res);
  };

  useEffect(() => {
    getChallenge();
  }, []);

  return (
    <div>
      <BackButton />
      <img src="challenge/example.jpg" alt="..." />
      {challenge.title}
      <hr />
      <div className="flex">
        <div
          className={`${isSelected === "info" ? "font-bold" : null}`}
          onClick={() => onClickInfoSelected()}
        >
          정보
        </div>
        <div
          className={`${isSelected === "comment" ? "font-bold" : null}`}
          onClick={() => onClickCommentSelected()}
        >
          댓글
        </div>
      </div>
      <hr />
      <div className={`${isSelected === "info" ? null : "hidden"}`}>
        <ChallengeDetailInfo />
      </div>
      <div className={`${isSelected === "comment" ? null : "hidden"}`}>
        <ChallengeDetailComment />
      </div>
    </div>
  );
};

export default ChallengeDetail;
