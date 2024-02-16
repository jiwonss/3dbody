import { useEffect, useState } from "react";
import ChallengeComment from "./../../components/challenge/ChallengeComment";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import axios from "axios";
import { userState } from "../../recoil/common/UserState";

const ChallengeDetailComment = () => {
  const { challengeId } = useParams();
  const [commentList, setCommentList] = useState([]);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
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
        userId={comment.user_id}
        profileImage={comment.profile_image}
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
        user_id: user.info.userId,
      })
      .then(() => {
        setContent("");
      });
  };

  return (
    <div>
      {commentList.length ? (
        <div>{comments}</div>
      ) : (
        <div className="mt-10 text-center text-gray-500">
          등록된 댓글이 없습니다.
        </div>
      )}
      <br />
      <div className="fixed w-screen p-4 bottom-11">
        <form onSubmit={onSubmitHandler} className="flex">
          <input
            className="pl-2 border rounded-lg border-slate-950"
            type="text"
            value={content}
            onChange={onContentHandler}
            placeholder="댓글을 입력해주세요."
          />
          <button className="w-20 h-10 text-white bg-teal-700 border rounded-lg">
            입력
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChallengeDetailComment;
