import PropTypes from "prop-types";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import TrainingSetBox from "./TrainingSetBox";
import { userState } from "../../../recoil/common/UserState";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";

const TrainingDetailBox = ({ data, idx }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);

  const trainingVolume = () => {
    return data.sets.reduce((acc, cur) => {
      return acc + cur.count * cur.kg;
    }, 0);
  };

  // 세트 삭제 버튼
  const deleteSet = async () => {
    await axios
      .delete(`${baseUrl}api/management/training/set`, {
        user_id: user.info.userId,
        training_id: data.training_id,
        date: `${selectedDateState[0]}-${selectedDateState[1]}-${selectedDateState[2]}`,
      })
      .then((res) => {
        console.table(res.data);
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
        date: new Date(selectedDateState[0], selectedDateState[1]-1, selectedDateState[2])
        // date: `${selectedDateState[0]}-${selectedDateState[1]}-${selectedDateState[2]}`,
      })
      .then((res) => {
        console.table(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <p>
        <span className="font-semibold text-teal-700">{idx + 1}</span> {data.name}
      </p>
      <hr className="my-2" />
      <p className="my-1 text-sm">총 볼륨 {trainingVolume()}kg</p>

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
        <button className="flex justify-center gap-2" onClick={() => deleteSet()}>
          <MinusIcon className="w-6 h-6" />
          세트 삭제
        </button>
        <button className="flex justify-center gap-2 text-teal-700" onClick={() => postSet()}>
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
