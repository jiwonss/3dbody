import PropTypes from "prop-types";

const ChallengeComment = ({ content, nickname }) => {
  return (
    <div>
      <div>{nickname}</div>
      <div>{content}</div>
      <hr />
    </div>
  );
};

ChallengeComment.propTypes = {
  nickname: PropTypes.string,
  content: PropTypes.string,
};

export default ChallengeComment;
