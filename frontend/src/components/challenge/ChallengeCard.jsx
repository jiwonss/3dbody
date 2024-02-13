import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ChallengeCard = ({
  challengeId,
  challengeTitle,
  challengeSummary,
  challengeThumbnail,
}) => {

  return (
    <div className="justify-self-center">
      <Link to={`/challenge/${challengeId}`}>
        <div className="card -z-10">
          <div className="flex flex-wrap justify-center">
            <div className="mt-3 h-44 w-44">
              <img
                className="w-full h-full border-2 rounded-lg"
                src={challengeThumbnail}
                alt="썸네일"
              />
            </div>
            <div className="mt-1 w-44">
              <div className="text-sm font-semibold text-left truncate">{challengeTitle}</div>
              <p className="text-xs text-left text-gray-400 truncate">
                {challengeSummary}
              </p>
            </div>
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
  challengeStartDate: PropTypes.string,
  challengeEndDate: PropTypes.string,
};

export default ChallengeCard;
