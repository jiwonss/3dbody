import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { BsFillTrash3Fill } from "react-icons/bs";
import { baseUrlState } from "../../../../recoil/common/BaseUrlState";
import EditRoutineSetBox from "./EditRoutineSetBox";
import { selectedRoutineState } from "../../../../recoil/diary/SelectedRoutineState";
import { selectedRoutineInfoState } from "../../../../recoil/diary/SelectedRoutineInfoState";

const EditRoutineDetailBox = ({ data, idx }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const setSelectedRoutine = useSetRecoilState(selectedRoutineState);
  const selectedRoutineInfo = useRecoilValue(selectedRoutineInfoState);
  const [reset, setReset] = useState(true);

  // 루틴 총 볼륨 계산
  const trainingVolume = () => {
    return data.sets.reduce((acc, cur) => {
      return acc + cur.count * cur.kg;
    }, 0);
  };

  // 운동 삭제 버튼
  const deleteTraining = async () => {
    await axios
      .delete(
        `${baseUrl}api/management/routine/delete?routine_id=${data.routineId}&training_id=${data.trainingId}`
      )
      .then((res) => {
        console.log("루틴 내 운동 삭제 성공");
        setReset(!reset);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 세트 삭제 버튼
  const deleteSet = async () => {
    await axios
      .delete(
        `${baseUrl}api/management/routine/set/${data.routineTrainingListId}`
      )
      .then((res) => {
        console.log("루틴 내 운동 세트 삭제");
        setReset(!reset);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 세트 추가 버튼
  const postSet = async () => {
    await axios
      .post(`${baseUrl}api/management/routine/set`, {
        routineId: data.routineId,
        trainingId: data.trainingId,
      })
      .then((res) => {
        console.log("루틴 내 운동 세트 추가");
        setReset(!reset);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 루틴 데이터 업데이트
  const getRoutineDetail = async () => {
    await axios
      .get(
        `${baseUrl}api/management/routine/detail?routine_id=${selectedRoutineInfo.routineId}`
      )
      .then((res) => {
        setSelectedRoutine(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRoutineDetail();
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
        <div className="flex items-center" onClick={() => deleteTraining()}>
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
          </tr>
        </thead>
        <tbody>
          {data.sets.map((set, setIdx) => (
            <tr key={setIdx} className="text-center">
              <EditRoutineSetBox set={set} setIdx={setIdx} />
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

EditRoutineDetailBox.propTypes = {
  data: PropTypes.object,
  idx: PropTypes.number,
};

export default EditRoutineDetailBox;
