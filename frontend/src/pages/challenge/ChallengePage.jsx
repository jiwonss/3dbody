import ToggleTap from "../../components/common/ToggleTap";
import PageTitle from "../../components/common/PageTitle";
import ChallengeParticipating from "./ChallengeParticipatingPage";
import { useRecoilValue } from "recoil";
import { toggleState } from "../../recoil/common/ToggleState";
import ChallengeCanParticipate from "./CallengeCanParticipatePage";
import Button from "./../../components/common/Button";
import { userState } from "../../recoil/common/UserState";
import { Link } from 'react-router-dom';

const Challenge = () => {
  const isSelected = useRecoilValue(toggleState);
  const user = useRecoilValue(userState);

  return (
    <div>
      <PageTitle pageTitle={"챌린지"} />
      <ToggleTap
        leftTitle={"참여 가능"}
        rightTitle={"참여 중"}
        state={toggleState}
      />
      {isSelected === "left" ? (
        <ChallengeCanParticipate />
      ) : (
        <ChallengeParticipating />
      )}
      <Link to="/challenge/registration">
        <div>
          {user.info.role === "ROLE_ADMIN" ? (
            <Button buttonName={"챌린지 생성하기"} />
          ) : null}
        </div>
      </Link>
    </div>
  );
};

export default Challenge;
