import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import TrainingSetBox from "./TrainingSetBox";
import { userState } from "../../../recoil/common/UserState";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import { userTrainingState } from "../../../recoil/diary/UserTrainingState";
import { BsFillTrash3Fill } from "react-icons/bs";

const TrainingDetailBox = ({ data, idx }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const setUserTraining = useSetRecoilState(userTrainingState);
  const [reset, setReset] = useState(true);

  const trainingVolume = () => {
    return data.sets.reduce((acc, cur) => {
      return acc + cur.count * cur.kg;
    }, 0);
  };

  // 스프링의 LocalDate 형식으로 가공하기
  const selectedTime = new Date(
    selectedDate[0],
    selectedDate[1] - 1,
    selectedDate[2]
  );
  const KoreaTimeDiff = 9 * 60 * 60 * 1000; // 9시간 더해주기 -> 스프링에서 9시간 빼서 계산함
  const KoreaNow = new Date(selectedTime.getTime() + KoreaTimeDiff)
    .toISOString()
    .split("T")[0]; // 시간 부분 빼기

  // 운동 삭제 버튼
  const deleteTraining = async () => {
    await axios
      .delete(`${baseUrl}api/management/training`, {
        data: {
          user_id: user.info.userId,
          training_id: data.training_id,
          date: KoreaNow,
        },
      })
      .then((res) => {
        setReset(!reset);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 세트 삭제 버튼
  const deleteSet = async () => {
    await axios
      .delete(`${baseUrl}api/management/training/set`, {
        data: {
          user_id: user.info.userId,
          training_id: data.training_id,
          date: KoreaNow,
        },
      })
      .then((res) => {
        setReset(!reset);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 세트 추가 버튼
  const postSet = async () => {
    await axios
      .post(`${baseUrl}api/management/training/set`, {
        user_id: user.info.userId,
        training_id: data.training_id,
        date: KoreaNow,
      })
      .then((res) => {
        setReset(!reset);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 운동 데이터 업데이트
  const getUserTraining = async () => {
    await axios
      .get(
        `${baseUrl}api/management/training?user_id=${user.info.userId}&year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`
      )
      .then((res) => {
        setUserTraining(res.data.user_training_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserTraining();
  }, [reset]);

  return (
    <>
      <div className="flex justify-between">
        <p>
          <span className="text-lg font-semibold text-teal-700">{idx + 1}</span>{" "}
          <span>
            <span className="ps-1 pe-2">{data.category}</span>|
            <span className="px-2">{data.name}</span>
          </span>
        </p>
        <div className="flex items-center me-2" onClick={() => deleteTraining()}>
          <BsFillTrash3Fill className="w-5 h-5" />
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between mx-2 my-1 text-sm font-semibold">
        <p>총 볼륨 </p>
        <p>{trainingVolume()}kg</p>
      </div>
      <hr className="my-2"/>

      <table className="w-full">
        <thead>
          <tr className="text-gray-400 ">
            <th>세트</th>
            <th>kg</th>
            <th>회</th>
            <th>완료</th>
          </tr>
        </thead>
        <tbody>
          {data.sets.map((set, setIdx) => (
            <tr key={setIdx} className="text-center">
              <TrainingSetBox set={set} setIdx={setIdx} />
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-2 pt-4 pb-2 text-center divide-x-2">
        <button
          className="flex justify-center gap-2"
          onClick={() => deleteSet()}
        >
          <MinusIcon className="w-6 h-6" />
          세트 삭제
        </button>
        <button
          className="flex justify-center gap-2 text-teal-700"
          onClick={() => postSet()}
        >
          <PlusIcon className="w-6 h-6" />
          세트 추가
        </button>
      </div>
    </>
  );
};

TrainingDetailBox.propTypes = {
  data: PropTypes.object,
  idx: PropTypes.number,
};

export default TrainingDetailBox;
