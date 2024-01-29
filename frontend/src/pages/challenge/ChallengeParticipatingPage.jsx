import axios from "axios";
import { useEffect, useState } from "react";
import ChallengeCard from "../../components/challenge/ChallengeCard";

const ChallengeParticipating = () => {
  const [challengeList, setChallengeList] = useState([])

  // challenge 목록 가져오기
  const getChallengeList = async () => {
    const res = (
      await axios.get(
        "http://i10c204.p.ssafy.io:8082/api/challenge/list/proceeding"
      )
    ).data;
    setChallengeList(res)
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
      <div>{challenges}</div>
    </div>
  );
};

export default ChallengeParticipating;
