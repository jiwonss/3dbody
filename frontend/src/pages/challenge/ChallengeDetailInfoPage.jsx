import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalendarIcon, UsersIcon, FlagIcon } from "@heroicons/react/24/solid";
import Button from "./../../components/common/Button";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";

const ChallengeDetailInfo = () => {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState({});
  const baseUrl = useRecoilValue(baseUrlState);
  const [isParticipate, setIsParticipate] = useState(null);

  // challenge 가져오기
  const getChallenge = async () => {
    const res = (
      await axios.get(`${baseUrl}api/challenge/detail/${challengeId}`)
    ).data;
    setChallenge(res);
  };

  // 바로하면 date 데이터를 문자열로 못받아와서 에러남
  // ""를 붙여가지고 강제로 문자열로 만들어서 slice
  let subStartDate = "" + challenge.start_date;
  let subEndDate = "" + challenge.end_date;
  const startDate = subStartDate.slice(0, 10);
  const endDate = subEndDate.slice(0, 10);

  // 챌린지 참여하기
  const onParticipateHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `${baseUrl}api/challenge/${challengeId}/user/${localStorage.getItem(
          "userId"
        )}`
      )
      .then(() => {
        setIsParticipate(true);
      });
  };

  // 챌린지 참여 취소하기
  const onParticipateCancelHandler = async (event) => {
    event.preventDefault();
    await axios
      .delete(
        `${baseUrl}api/challenge/${challengeId}/user/${localStorage.getItem(
          "userId"
        )}`
      )
      .then(() => {
        setIsParticipate(false);
      });
  };

  const getParticipateChallenge = async () => {
    await axios
      .get(
        `${baseUrl}api/challenge/${challengeId}/user/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((res) => {
        setIsParticipate(res.data);
      });
  };

  useEffect(() => {
    getChallenge();
    getParticipateChallenge();
  }, [challenge]);

  return (
    <div>
      <div>
        <div className="flex">
          <CalendarIcon className="w-4 h-4" />
          <p>
            {startDate} ~ {endDate}
          </p>
        </div>
        <div className="flex">
          <UsersIcon className="w-4 h-4" />
          <p>{challenge.entry}명 참여</p>
        </div>
        <div className="flex">
          <FlagIcon className="h-4 W-4" />
          <p>{challenge.summary}</p>
        </div>
        <hr />
        {isParticipate ? (
          <Button buttonName={"참여 중"} onClick={onParticipateCancelHandler} />
        ) : (
          <Button buttonName={"참여하기"} onClick={onParticipateHandler} />
        )}
        <hr />
        {challenge.content}
      </div>
    </div>
  );
};

export default ChallengeDetailInfo;
