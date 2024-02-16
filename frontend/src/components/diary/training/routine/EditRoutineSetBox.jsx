import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseUrlState } from "../../../../recoil/common/BaseUrlState";
import { selectedRoutineState } from "../../../../recoil/diary/SelectedRoutineState";
import { selectedRoutineInfoState } from "../../../../recoil/diary/SelectedRoutineInfoState";

const EditRoutineSetBox = ({ set, setIdx }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const setSelectedRoutine = useSetRecoilState(selectedRoutineState);
  const selectedRoutineInfo = useRecoilValue(selectedRoutineInfoState);
  const [kg, setKg] = useState(set.kg);
  const [count, setCount] = useState(set.count);
  const [reset, setReset] = useState(true);

  const onChangeKg = (e) => {
    setKg(e.target.value);
  };

  const onChangeCount = (e) => {
    setCount(e.target.value);
  };

  // kg 단위 변경
  const putVolumeKg = async (e) => {
    e.preventDefault();
    await axios
      .put(`${baseUrl}api/management/routine/set`, {
        routineTrainingListId: set.routineTrainingListId,
        kg: kg,
        count: set.count,
      })
      .then((res) => {
        console.log("kg 수정 성공");
        setReset(!reset);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // count 단위 변경
  const putVolumeCount = async (e) => {
    e.preventDefault();
    await axios
      .put(`${baseUrl}api/management/routine/set`, {
        routineTrainingListId: set.routineTrainingListId,
        kg: set.kg,
        count: count,
      })
      .then((res) => {
        console.log("count 수정 성공");
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
      <td>{setIdx + 1}</td>
      <td>
        <form onSubmit={putVolumeKg} onBlur={putVolumeKg}>
          <input
            className="w-16 mx-2 text-center border"
            value={kg}
            onChange={onChangeKg}
          />
        </form>
      </td>
      <td>
        <form onSubmit={putVolumeCount} onBlur={putVolumeCount}>
          <input
            className="w-16 mx-2 text-center border"
            value={count}
            onChange={onChangeCount}
          />
        </form>
      </td>
    </>
  );
};

EditRoutineSetBox.propTypes = {
  set: PropTypes.object,
  setIdx: PropTypes.number,
};

export default EditRoutineSetBox;
