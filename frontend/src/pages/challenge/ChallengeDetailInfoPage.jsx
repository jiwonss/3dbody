import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalendarIcon, UsersIcon, FlagIcon } from "@heroicons/react/24/solid";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import { Link } from "react-router-dom";

const ChallengeDetailInfo = () => {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState({});
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const [isParticipate, setIsParticipate] = useState(null);

  // challenge 가져오기
  const getChallenge = async () => {
    const res = (
      await axios.get(`${baseUrl}api/challenge/detail/${challengeId}`)
    ).data;
    setChallenge(res);
  };

  // 참여중인 챌린지 가져오기
  const getParticipateChallenge = async () => {
    await axios
      .get(`${baseUrl}api/challenge/${challengeId}/user/${user.info.userId}`)
      .then((res) => {
        setIsParticipate(res.data);
      });
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
      .post(`${baseUrl}api/challenge/${challengeId}/user/${user.info.userId}`)
      .then(() => {
        setIsParticipate(true);
      });
  };

  // 챌린지 참여 취소하기
  const onParticipateCancelHandler = async (event) => {
    event.preventDefault();
    await axios
      .delete(`${baseUrl}api/challenge/${challengeId}/user/${user.info.userId}`)
      .then(() => {
        setIsParticipate(false);
      });
  };

  useEffect(() => {
    getChallenge();
    getParticipateChallenge();
  }, [challenge]);

  return (
    <div>
      <div>
        <div className="mt-2 mb-2 ml-4">
          <div className="flex items-center mb-1">
            <CalendarIcon className="w-5 h-5 mr-2 text-teal-700" />
            <p className="text-lg">
              {startDate} ~ {endDate}
            </p>
          </div>
          <div className="flex items-center mb-1">
            <UsersIcon className="w-5 h-5 mr-2 text-teal-700" />
            <p className="text-lg">{challenge.entry}명 참여</p>
          </div>
          <div className="flex items-center">
            <FlagIcon className="w-5 h-5 mr-2 text-teal-700" />
            <p className="text-lg truncate">{challenge.summary}</p>
          </div>
        </div>
        <div className="flex justify-center">
          {isParticipate ? (
            <button
              onClick={onParticipateCancelHandler}
              className="w-10/12 p-2 mt-3 mb-4 text-center text-teal-700 bg-white border-2 border-teal-700 rounded-full"
            >
              참여중
            </button>
          ) : (
            <button
              onClick={onParticipateHandler}
              className="w-10/12 p-2 mt-3 mb-4 text-center text-white bg-teal-700 border-2 border-teal-700 rounded-full"
            >
              참여하기
            </button>
          )}
        </div>
        <hr />
        <div className="m-4">
          <p className="text-2xl">상세정보</p>
          {challenge.content}
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          {isParticipate ? (
            <Link
              to="/challenge/ongoing"
              className="w-10/12 p-2 mt-3 mb-4 text-center text-white bg-teal-700 border-2 border-teal-700 rounded-full"
            >
              챌린지 시작하기
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailInfo;
