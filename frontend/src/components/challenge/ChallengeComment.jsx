import PropTypes from "prop-types";
import { TrashIcon } from "@heroicons/react/24/solid";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userState } from "../../recoil/common/UserState";

const ChallengeComment = ({
  content,
  nickname,
  commentId,
  userId,
  profileImage,
}) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);

  const onDeleteHandler = async (event) => {
    event.preventDefault();
    await axios.delete(`${baseUrl}api/comment/${commentId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-2 bg-gray-100 border-2 rounded-xl">
        <div className="flex">
          <img
            src={
              profileImage
                ? profileImage
                : "/challenge/기본이미지.jpg"
            }
            alt="..."
            className="w-10 h-10 m-1 rounded-full"
          />
          <div>
            <p>{nickname}</p>
            <p>{content}</p>
          </div>
        </div>
        {userId === user.info.userId ? (
          <div className="flex">
            <div onClick={onDeleteHandler}>
              <TrashIcon className="w-5 h-5 mr-2" />
            </div>
            {/* <div>
              <PencilIcon className="h-7 w-7" />
            </div> */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

ChallengeComment.propTypes = {
  nickname: PropTypes.string,
  content: PropTypes.string,
  commentId: PropTypes.number,
  userId: PropTypes.number,
  profileImage: PropTypes.string,
};

export default ChallengeComment;
