import ChallengeCard from './../../components/challenge/ChallengeCard';
import ToggleTap from './../../components/common/ToggleTap';
import BottomNavbar from './../../components/common/BottomNavbar';

const Challenge = () => {
  return (
    <div>
      <ToggleTap />
      <ChallengeCard />
      <ChallengeCard />
      <BottomNavbar />
    </div>
  );
};

export default Challenge;
