import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ChallengeCard = ({
  challengeId,
  challengeTitle,
  challengeSummary,
  challengeThumbnail,
  challengeStartDate,
  challengeEndDate,
}) => {
  let subStartDate = "" + challengeStartDate;
  let subEndDate = "" + challengeEndDate;
  // const startDate = subStartDate.slice(0, 10);
  // const endDate = subEndDate.slice(0, 10);


  return (
    <div className="justify-self-center">
      <Link to={`/challenge/${challengeId}`}>
        <div className="card -z-10">
          <div className="flex flex-wrap justify-center">
            <div className="w-32 h-32 mt-3">
              <img
                className="w-full h-full rounded-lg"
                src={challengeThumbnail}
                alt="썸네일"
              />
            </div>
            <div className="w-32 mt-1">
              <div className="text-sm font-semibold text-left truncate">{challengeTitle}</div>
              <p className="text-xs text-left text-gray-400 truncate">
                {challengeSummary}
              </p>
              {/* <div className="text-xs text-left text-gray-500 text-nowrap">
                기간 : {startDate}~{endDate}
              </div> */}
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
