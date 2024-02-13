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
            <div className="w-40 mt-3 h-52">
              <img
                className="w-full h-full border-2 rounded-lg"
                src={challengeThumbnail}
                alt="썸네일"
              />
            </div>
            <div className="w-40 mt-1">
              <div className="text-lg font-semibold text-left truncate">{challengeTitle}</div>
              <p className="text-base text-left text-gray-400 truncate">
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
