import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalendarIcon, UsersIcon, FlagIcon } from "@heroicons/react/24/solid";
import Button from "./../../components/common/Button";

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const [isSelected, setIsSelected] = useState("info");
  const [challenge, setChallenge] = useState({});

  // 정보 선택 함수
  const onClickInfoSelected = () => {
    setIsSelected("info");
  };

  // 댓글 선택 함수
  const onClickCommentSelected = () => {
    setIsSelected("comment");
  };

  // challenge 가져오기
  const getChallenge = async () => {
    const res = (
      await axios.get(
        `http://i10c204.p.ssafy.io:8082/api/challenge/detail/${challengeId}`
      )
    ).data;
    setChallenge(res);
    console.log(res)
  };

  useEffect(() => {
    getChallenge();
  }, []);

  return (
    <div>
      <div>
        <img src="challenge/example.jpg" alt="..." />
        {challenge.title}
        <hr />
        <div className="flex">
          <Link onClick={() => onClickInfoSelected()}>
            <div className={`${isSelected === "info" ? "font-bold" : null}`}>
              정보
            </div>
          </Link>
          <Link onClick={() => onClickCommentSelected()}>
            <div className={`${isSelected === "comment" ? "font-bold" : null}`}>
              댓글
            </div>
          </Link>
        </div>
        <hr />
        <div className={`${isSelected === "info" ? null : "hidden"}`}>
          <div className="flex">
            <CalendarIcon className="w-4 h-4" />
            <p>{challenge.start_date} ~ {challenge.end_date}</p>
          </div>
          <div className="flex">
            <UsersIcon className="w-4 h-4" />
            <p>{challenge.entry}명 참여</p>
          </div>
          <div className="flex">
            <FlagIcon className="h-4 W-4" />
            <p>{challenge.summary}</p>
          </div>
          <Button />
          <hr />
          {challenge.content}
        </div>
        <div className={`${isSelected === "comment" ? null : "hidden"}`}>
          댓글입니다.
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
