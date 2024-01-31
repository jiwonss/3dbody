import { useEffect, useState } from "react";
import ChallengeComment from "./../../components/challenge/ChallengeComment";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import axios from "axios";

const ChallengeDetailComment = () => {
  const { challengeId } = useParams();
  const [commentList, setCommentList] = useState([]);
  const basicUrl = useRecoilValue(baseUrlState);

  // 댓글 리스트 가져오기
  const getCommentList = async () => {
    const res = (await axios.get(`${basicUrl}api/comment/${challengeId}`)).data;
    setCommentList(res);
    console.log(res);
  };

  // onMount 느낌으로 화면 켜질 때
  useEffect(() => {
    getCommentList();
  }, []);

  const comments = commentList.map((comment) => {
    return (
      <ChallengeComment
        key={comment.comment_id}
        content={comment.content}
        nickname={comment.nickname}
      />
    );
  });
  return <div>{comments}</div>;
};

export default ChallengeDetailComment;
