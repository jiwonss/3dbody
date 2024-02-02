import "./ChallengeCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ChallengeCard = ({
  challengeId,
  challengeTitle,
  challengeSummary,
  challengeThumbnail,
}) => {
  return (
    <div>
      <Link to={`/challenge/${challengeId}`}>
        <div className="card">
          <div className="content">
            <div>
              <img className="thumbnail" src={challengeThumbnail} alt="..." />
            </div>
            <div className="title">{challengeTitle}</div>
            <div className="description">{challengeSummary}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

ChallengeCard.propTypes = {
  challengeId: PropTypes.number,
  challengeTitle: PropTypes.string,
  challengeSummary: PropTypes.string,
  challengeThumbnail: PropTypes.string,
};

export default ChallengeCard;
