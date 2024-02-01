import axios from "axios";
import { useEffect, useState } from "react";
import ChallengeCard from "../../components/challenge/ChallengeCard";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";

const ChallengeParticipating = () => {
  const [challengeList, setChallengeList] = useState([]);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);

  // 참여중인 challenge 목록 가져오기
  const getChallengeList = async () => {
    const res = (
      await axios.get(`${baseUrl}api/challenge/list/${user.info.userId}`)
    ).data;
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
      />
    );
  });

  return (
    <div>
      {challenges.length ? (
        <div>{challenges}</div>
      ) : (
        <div className="flex justify-center">
          {"참여중인 챌린지가 없습니다."}
        </div>
      )}
    </div>
  );
};

export default ChallengeParticipating;
