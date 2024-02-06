import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { BsFillTrash3Fill } from 'react-icons/bs';
import { userTrainingState } from "../../../recoil/diary/UserTrainingState";
import Button from "../../common/Button";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState"
import TrainingDetailBox from './TrainingDetailBox';

const TrainingData = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const [userTraining, setUserTraining] = useRecoilState(userTrainingState);

  const isToday = () => {
    const today = new Date();
    return (
      today.getFullYear() === selectedDate[0] &&
      today.getMonth() === selectedDate[1] - 1 &&
      today.getDate() === selectedDate[2]
    );
  };

  const totalVolume = () => {
    return userTraining.reduce((acc, cur) => {
      return acc + cur.count * cur.kg;
    }, 0);
  };

  return (
    <>
      <div className="flex flex-col gap-2 pt-2 mx-4 mb-32">
        {/* 갤럭시 와치 연동 버튼 */}
        <div className={`flex justify-between ${isToday() ? "" : "opacity-0"}`} onClick={() => {return console.log("클릭")}}>
          <p className="font-semibold">✅Galaxy Watch</p>
          <Button btnCss={"w-1/5 text-white bg-teal-700 rounded"} buttonName={"전송"} />
        </div>
        {/* 전체 볼륨 */}
        <div className="flex justify-between px-4 py-2 bg-white rounded-lg">
          <p>전체 볼륨</p>
          <p>{totalVolume() + " kg"}</p>
        </div>
        {/* 해당날짜 운동 리스트 */}
        <div className="flex flex-col gap-2">
          {userTraining.map((data, idx) => {
            return (
              <div key={data.user_training_id} className="px-4 py-2 bg-white rounded-lg">
                <TrainingDetailBox data={data} idx={idx} />
              </div>
            );
          })}
        </div>
        {/* 운동 추가 / 불러오기 */}
        <div className="grid grid-cols-2 pt-2 mb-4 text-center divide-x-4">
          <Link to={`/diary/training/choice/basic`}>운동추가</Link>
          <Link to={`/diary/training/load/basic`}>불러오기</Link>
        </div>
      </div>
      {/* 하단 -> (과거 오늘, 미래) 버튼 구분*/}
      <div className="fixed w-full bg-white bottom-[57px]">
        <div className="flex gap-4 m-4">
          <div className="p-2 text-center border border-teal-700 rounded-md basis-1/2">
            <Link to={``}>
              <Button buttonName="타이머" />
            </Link>
          </div>
          <div className="p-2 text-center text-white bg-teal-700 rounded-md basis-1/2">
            <Link to={``}>
              <Button buttonName="운동 시작하기" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingData;
