import "./ChallengeCard.css"
import { Link } from 'react-router-dom';

const ChallengeCard = () => {
  return (
    <div>
      <Link to="/challengedetail">
        <div className="card">
          <div className="content">
            <div>
              <img className="poster" src="challenge/example.jpg" alt="..." />
            </div>
            <div className="title">챌린지 제목</div>
            <div className="description">챌린지 내용입니다</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChallengeCard;
