import PropTypes from "prop-types";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userState } from "../../recoil/common/UserState";

const ChallengeComment = ({ content, nickname, commentId, userId }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);

  const onDeleteHandler = async (event) => {
    event.preventDefault();
    await axios.delete(`${baseUrl}api/comment/${commentId}`);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p>{nickname}</p>
          <p>{content}</p>
        </div>
        {userId === user.info.userId ? (
          <div className="flex">
            <div onClick={onDeleteHandler}>
              <TrashIcon className="h-7 w-7" />
            </div>
            <div>
              <PencilIcon className="h-7 w-7" />
            </div>
          </div>
        ) : null}
      </div>
      <hr />
    </div>
  );
};

ChallengeComment.propTypes = {
  nickname: PropTypes.string,
  content: PropTypes.string,
  commentId: PropTypes.number,
  userId: PropTypes.number,
};

export default ChallengeComment;
