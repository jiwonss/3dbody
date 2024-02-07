import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import { userTrainingState } from "../../../recoil/diary/UserTrainingState";
import { userState } from "../../../recoil/common/UserState";

const TrainingSetBox = ({ set, setIdx }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const selectedDate = useRecoilValue(selectedDateState);
  const setUserTraining = useSetRecoilState(userTrainingState);
  const user = useRecoilValue(userState);
  const [kg, setKg] = useState(set.kg);
  const [count, setCount] = useState(set.count);
  const [isFinished, setIsFinished] = useState(set.is_finished);
  const [reset, setRest] = useState(true);

  const onChangeKg = (e) => {
    setKg(e.target.value);
  };

  const onChangeCount = (e) => {
    setCount(e.target.value);
  };

  // 오늘인지 확인
  const isToday = () => {
    const today = new Date();
    return (
      today.getFullYear() === selectedDate[0] &&
      today.getMonth() === selectedDate[1] - 1 &&
      today.getDate() === selectedDate[2]
    );
  };

  // 운동 완료 여부 체크 버튼
  const putIsFinished = async () => {
    await axios
      .put(`${baseUrl}api/management/training/user_training/${set.user_training_id}`)
      .then((res) => {
        console.log(res.data);
        setIsFinished(!isFinished);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // kg 단위 변경
  const putVolumeKg = async (e) => {
    e.preventDefault();
    await axios
      .put(`${baseUrl}api/management/training/set`, {
        user_training_id: set.user_training_id,
        kg: kg,
        count: set.count,
      })
      .then((res) => {
        console.log(res.data);
        setRest(!reset);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // count 단위 변경
  const putVolumeCount = async (e) => {
    e.preventDefault();
    await axios
      .put(`${baseUrl}api/management/training/set`, {
        user_training_id: set.user_training_id,
        kg: set.kg,
        count: count,
      })
      .then((res) => {
        console.log(res.data);
        setRest(!reset);
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
        setUserTraining(res.data);
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
      <td>{setIdx + 1}</td>
      <td>
        <form onSubmit={putVolumeKg}>
          <input className="w-16 mx-2 text-center border" value={kg} onChange={onChangeKg} />
        </form>
      </td>
      <td>
        <form onSubmit={putVolumeCount}>
          <input className="w-16 mx-2 text-center border" value={count} onChange={onChangeCount} />
        </form>
      </td>
      <td className="flex justify-center">
        {isToday() ? (
          <input
            type="checkbox"
            className="w-5 h-5 mt-1 accent-teal-600"
            onChange={() => putIsFinished()}
            checked={isFinished}
          />
        ) : (
          <BsFillTrash3Fill className="w-6 h-6" />
        )}
      </td>
    </>
  );
};

TrainingSetBox.propTypes = {
  set: PropTypes.object,
  setIdx: PropTypes.number,
};

export default TrainingSetBox;
