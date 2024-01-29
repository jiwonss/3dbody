import { Link } from "react-router-dom";
import { useState } from "react";
import { CalendarIcon, UsersIcon, FlagIcon } from "@heroicons/react/24/solid";
import Button from './../../components/common/Button';

const ChallengeDetail = () => {
  const [isSelected, setIsSelected] = useState("info");

  // 정보 선택 함수
  const onClickInfoSelected = () => {
    setIsSelected("info");
  };

  // 댓글 선택 함수
  const onClickCommentSelected = () => {
    setIsSelected("comment");
  };

  return (
    <div>
      <div>
        <img src="challenge/example.jpg" alt="..." />
        챌린지 제목
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
            <p>2024. 02. 16.</p>
          </div>
          <div className="flex">
            <UsersIcon className="w-4 h-4" />
            <p>10명 참여</p>
          </div>
          <div className="flex">
            <FlagIcon className="h-4 W-4" />
            <p>플랭크를 오래오래 버텨 보세요!</p>
          </div>
          <Button />
          <hr />
          상세정보
          
        </div>
        <div className={`${isSelected === "comment" ? null : "hidden"}`}>
          댓글입니다.
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
