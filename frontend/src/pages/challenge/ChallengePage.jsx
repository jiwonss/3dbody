import axios from "axios";
import { useEffect } from "react";
import ChallengeCard from "../../components/challenge/ChallengeCard";
import ToggleTap from "../../components/common/ToggleTap";
import PageTitle from "../../components/common/PageTitle";

const Challenge = () => {
  // axios 수정 해야함
  const getChallengeList = async () => {
    const res = (
      await axios.get(
        "http://i10c204.p.ssafy.io:8082/api/challenge/list/proceeding"
      )
    ).data;
    console.log(res);
  };

  useEffect(() => {
    getChallengeList();
  });

  return (
    <div>
      <PageTitle pageTitle={"챌린지"} />
      <ToggleTap />
      <ChallengeCard />
      <ChallengeCard />
    </div>
  );
};

export default Challenge;

