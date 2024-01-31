import { useEffect, useState } from "react";
import ChallengeComment from "./../../components/challenge/ChallengeComment";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import axios from "axios";
import Button from "./../../components/common/Button";

const ChallengeDetailComment = () => {
  const { challengeId } = useParams();
  const [commentList, setCommentList] = useState([]);
  const baseUrl = useRecoilValue(baseUrlState);
  const [content, setContent] = useState("");

  // 댓글 리스트 가져오기
  const getCommentList = async () => {
    const res = (await axios.get(`${baseUrl}api/comment/${challengeId}`)).data;
    setCommentList(res);
  };

  // onMount 느낌으로 화면 켜질 때
  useEffect(() => {
    getCommentList();
  }, [commentList]);

  // 댓글 목록 출력
  const comments = commentList.map((comment) => {
    return (
      <ChallengeComment
        key={comment.comment_id}
        content={comment.content}
        nickname={comment.nickname}
        commentId={comment.comment_id}
      />
    );
  });

  // 댓글 등록
  const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(`${baseUrl}api/comment/${challengeId}`, {
        content: content,
        user_id: localStorage.getItem("userId"),
      })
      .then(() => {
        setContent("")
      });
  };

  return (
    <div>
      <div>
        {comments}
      </div>
      <br />
      <div>
        <form onSubmit={onSubmitHandler}>
          <input
            className="border border-slate-950"
            type="text"
            value={content}
            onChange={onContentHandler}
          />
          <Button buttonName={"등록"} />
        </form>
      </div>
    </div>
  );
};

export default ChallengeDetailComment;
