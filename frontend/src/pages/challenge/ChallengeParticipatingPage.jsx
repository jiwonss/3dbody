import axios from "axios";
import { useEffect, useState } from "react";
import ChallengeCard from "../../components/challenge/ChallengeCard";
import { useRecoilValue } from "recoil";
import { BasicUrlState } from "../../recoil/common/BasicUrlState";

const ChallengeParticipating = () => {
  const [challengeList, setChallengeList] = useState([])
  const basicUrl = useRecoilValue(BasicUrlState);

  // 참여중인 challenge 목록 가져오기
  // 리코일 써서 user정보 저장된거에서 id가져 오면 될듯
  const getChallengeList = async () => {
    const res = (
      await axios.get(
        `${basicUrl}api/challenge/list/${user_id}`
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
