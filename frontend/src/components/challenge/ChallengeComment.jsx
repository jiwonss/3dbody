import PropTypes from "prop-types";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userState } from "../../recoil/common/UserState";
import { useEffect, useState } from 'react';

const ChallengeComment = ({ content, nickname, commentId, userId }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const [imgSrc, setImgSrc] = useState("")
  
  const onDeleteHandler = async (event) => {
    event.preventDefault();
    await axios.delete(`${baseUrl}api/comment/${commentId}`);
  };

  useEffect(() => {
    if (user.info.profile_img) {
      setImgSrc(user.info.profile_img)
    }
  }, [imgSrc])

  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-2 bg-gray-100 border-2 rounded-xl">
        <div className="flex">
          <img
            src={imgSrc}
            alt="..."
            onError={(event) => {
              console.log(event);
              event.target.src = "/challenge/기본이미지.jpg";
            }}
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
};

export default ChallengeComment;
