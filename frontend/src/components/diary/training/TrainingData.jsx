import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userTrainingState } from "../../../recoil/diary/UserTrainingState";
import Button from "../../common/Button";
import {
  selectedDateState,
  selectedDayState,
} from "../../../recoil/diary/SelectedDateState";
import TrainingDetailBox from "./TrainingDetailBox";
import TrainingBottomBtn from "./TrainingBottomBtn";
import { useEffect, useState } from "react";
import { BsAlarm } from "react-icons/bs";
import Description from "./Description";
import { FaDumbbell } from "react-icons/fa6";
import { GiMuscleUp } from "react-icons/gi";

const TrainingData = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = useRecoilValue(selectedDayState);
  const userTraining = useRecoilValue(userTrainingState);
  const [isFinish, setIsFinish] = useState(
    localStorage.getItem(`date_${selectedDate.join("-")}_finish`) ? true : false
  );
  
  const isToday = () => {
    const today = new Date();
    return (
      today.getFullYear() === selectedDate[0] &&
      today.getMonth() === selectedDate[1] - 1 &&
      today.getDate() === selectedDate[2]
    );
  };

  const trainingTime = () => {
    return localStorage.getItem(`date_${selectedDate.join("-")}`);
  };

  const trainingCount = () => {
    return userTraining.length;
  };

  const totalVolume = () => {
    return userTraining.reduce((acc, cur) => {
      return (
        acc +
        cur.sets.reduce((acc, cur) => {
          return acc + cur.count * cur.kg;
        }, 0)
      );
    }, 0);
  };

  useEffect(() => {
    setIsFinish(localStorage.getItem(`date_${selectedDate.join("-")}_finish`) ? true : false)
  }, [selectedDate])

  return (
    <>
      {isFinish && (
        <div className={`flex flex-col gap-2 pt-2 mx-4 mb-32 ${userTraining.length === 1 ? "pb-32" : ""}`}>
          <p className="font-semibold">
            {selectedDate[1]}월 {selectedDate[2]}일 {selectedDay} - 운동
          </p>
          <div className="grid grid-cols-3 py-4 bg-white border-white divide-x-4 rounded-xl">
            <div className="relative flex flex-col items-center">
              <div className="absolute w-[88px] h-[88px] bg-[#E9E1D4]/30 rounded-full top-[-10px]"></div>
              <BsAlarm className="z-10 w-6 h-6" />
              <Description
                Title={`${trainingTime()}분`}
                subTitle={"운동 시간"}
              />
            </div>
            <div className="relative flex flex-col items-center">
              <div className="absolute w-[88px] h-[88px] bg-[#F5DDAD]/30 rounded-full top-[-10px]"></div>
              <FaDumbbell className="z-10 w-6 h-6" />
              <Description
                Title={`${trainingCount()}개`}
                subTitle={"운동 개수"}
              />
            </div>
            <div className="relative flex flex-col items-center">
            <div className="absolute w-[88px] h-[88px] bg-[#F1BCAE]/30 rounded-full top-[-10px]"></div>
              <GiMuscleUp className="z-10 w-6 h-6" />
              <Description
                Title={`${totalVolume()}kg`}
                subTitle={"전체 볼륨"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {userTraining.map((data, idx) => {
              return (
                <div key={idx} className="px-4 py-2 bg-white rounded-lg">
                  <div className="flex justify-between">
                    <p>
                      <span className="text-lg font-semibold text-teal-700">
                        {idx + 1}
                      </span>{" "}
                      <span>
                        <span className="ps-1 pe-2">{data.category}</span>|
                        <span className="px-2">{data.name}</span>
                      </span>
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mx-2 my-1 text-sm font-semibold">
                    <p>총 볼륨 </p>
                    <p>
                      {data.sets.reduce((acc, cur) => {
                        return acc + cur.count * cur.kg;
                      }, 0)}
                      kg
                    </p>
                  </div>
                  <hr className="my-2" />

                  <table className="w-full">
                    <thead>
                      <tr className="text-gray-400">
                        <th>세트</th>
                        <th>kg</th>
                        <th>회</th>
                        <th>완료</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.sets.map((set, setIdx) => (
                        <tr key={setIdx} className="text-center">
                          <td>{setIdx + 1}</td>
                          <td>
                            <p className="w-16 mx-auto font-semibold">
                              {set.kg}
                            </p>
                          </td>
                          <td>
                            <p className="w-16 mx-auto font-semibold">
                              {set.count}
                            </p>
                          </td>
                          <td className="flex justify-center">
                            <input
                              type="checkbox"
                              className="w-5 h-5 mt-1 accent-teal-600"
                              checked={set.is_finished}
                              onChange={() => {}}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
          <div className="mb-4"></div>
        </div>
      )}
      {!isFinish && (
        <div className={`flex flex-col gap-2 pt-2 mx-4 mb-32 ${userTraining.length === 1 ? "pb-28" : ""}`}>
          {/* 갤럭시 와치 연동 버튼 */}
          <div
            className={`flex justify-between ${isToday() ? "" : "opacity-0"}`}
            onClick={() => {
              return console.log("갤럭시 와치 데이터 연동");
            }}
          >
            <p className="font-semibold">✅Galaxy Watch</p>
            <Button
              btnCss={"w-1/5 text-white bg-teal-700 rounded"}
              buttonName={"전송"}
            />
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
                <div key={idx} className="px-4 py-2 bg-white rounded-lg">
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
      )}
      {/* 하단 -> (과거 오늘, 미래) 버튼 구분*/}
      <div className="fixed w-full bg-white bottom-[57px] border-t">
        <TrainingBottomBtn />
      </div>
    </>
  );
};

export default TrainingData;
