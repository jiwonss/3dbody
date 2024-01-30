import PropTypes from "prop-types";

const ChallengeComment = ({ content, nickname }) => {
  return (
    <div>
      {nickname}
      {content}
    </div>
  );
};

ChallengeComment.propTypes = {
  nickname: PropTypes.string,
  content: PropTypes.string,
};

export default ChallengeComment;
