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
        challengeStartDate={challenge.start_date}
        challengeEndDate={challenge.end_date}
      />
    );
  });

  return (
    <div>
      <div className="grid grid-cols-2 mb-16">
        {challenges.length ? (
          challenges
        ) : user.info.role === "ROLE_ADMIN" ? null : (
          <div className="col-start-1 col-end-3 text-center">
            참여가능한 챌린지가 없습니다.
          </div>
        )}
      </div>
      <div
        className={
          user.info.role === "ROLE_ADMIN"
            ? "fixed flex justify-center items-center bottom-20 right-6 w-16 h-16 border-2 rounded-full bg-teal-700"
            : "hidden"
        }
      >
        <div>
          <Link to="/challenge/registration">
            <PlusIcon className="w-8 h-8 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCanParticipate;
