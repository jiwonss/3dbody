import ToggleTap from "../../components/common/ToggleTap";
import PageTitle from "../../components/common/PageTitle";
import ChallengeParticipating from './ChallengeParticipatingPage';
import { useRecoilValue } from 'recoil';
import { toggleState } from '../../recoil/common/ToggleState';
import ChallengeCanParticipate from './CallengeCanParticipatePage';

const Challenge = () => {
  const isSelected = useRecoilValue(toggleState)
  return (
    <div>
      <PageTitle pageTitle={"챌린지"} />
      <ToggleTap leftTitle={"참여 가능"} rightTitle={"참여 중"}/>
      { isSelected === "left" ?  <ChallengeCanParticipate /> : <ChallengeParticipating />}
    </div>
  );
};

export default Challenge;
