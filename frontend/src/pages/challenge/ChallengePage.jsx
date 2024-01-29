import ToggleTap from "../../components/common/ToggleTap";
import PageTitle from "../../components/common/PageTitle";
import ChallengeParticipating from './ChallengeParticipatingPage';

const Challenge = () => {
  return (
    <div>
      <PageTitle pageTitle={"챌린지"} />
      <ToggleTap leftTitle={"참여 가능"} rightTitle={"참여 중"}/>
      <ChallengeParticipating />
    </div>
  );
};

export default Challenge;
