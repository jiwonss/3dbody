import axios from "axios";
import { useEffect, useState } from "react";
import ChallengeCard from "../../components/challenge/ChallengeCard";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { userState } from "../../recoil/common/UserState";

const ChallengeCanParticipate = () => {
  const [challengeList, setChallengeList] = useState([]);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);

  // 참여 가능한 challenge 목록 가져오기
  const getChallengeList = async () => {
    const res = (await axios.get(`${baseUrl}api/challenge/list/proceeding`))
      .data;
    setChallengeList(res);
  };

  // onMount 느낌으로 화면 켜질 때
  useEffect(() => {
    getChallengeList();
  }, []);

  // challenge 목록 돌면서 출력
  const challenges = challengeList.map((challenge) => {
    return (
      <ChallengeCard
        key={challenge.challenge_id}
        challengeId={challenge.challenge_id}
        challengeTitle={challenge.title}
        challengeSummary={challenge.summary}
        challengeThumbnail={challenge.thumbnail}
      />
    );
  });

  return (
    <div>
      {challenges.length ? (
        <div className="grid grid-cols-2">
          {challenges}
          <Link
            to="/challenge/registration"
            className={user.info.role === "ROLE_ADMIN" ? null : "hidden"}
          >
            <div className="card">
              <PlusIcon className="w-6 h-6" />
            </div>
          </Link>
        </div>
      ) : user.info.role === "ROLE_ADMIN" ? (
        <Link
          to="/challenge/registration"
          className={user.info.role === "ROLE_ADMIN" ? null : "hidden"}
        >
          <div className="card">
            <PlusIcon className="w-6 h-6" />
          </div>
        </Link>
      ) : (
        <div className="flex justify-center">
          {"참여 가능한 챌린지가 없습니다."}
        </div>
      )}
    </div>
  );
};

export default ChallengeCanParticipate;