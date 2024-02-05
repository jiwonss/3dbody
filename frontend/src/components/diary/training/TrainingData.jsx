import { useRecoilState, useRecoilValue } from "recoil";
import { userTrainingState } from "../../../recoil/diary/UserTrainingState";
import Button from "../../common/Button";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";

const TrainingData = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const [userTraining, setUserTraining] = useRecoilState(userTrainingState);

  const isToday = () => {
    const today = new Date()
    return (
      today.getFullYear() === selectedDate[0] && today.getMonth() === selectedDate[1] - 1 && today.getDate() === selectedDate[2]
    )
  }
  
  return (
    <div className="mx-4 mt-2">
      {/* 갤럭시 와치 연동 버튼 */}
      <div className={`flex justify-between ${isToday() ? "" : "hidden"}`}>
        <p className="font-semibold">✅Galaxy Watch</p>
        <Button btnCss={"w-1/5 text-white bg-teal-700 rounded"} buttonName={"전송"}/>
      </div>
      {/* 전체 볼륨 */}
      <div>
        test
      </div>
      {/* 해당날짜 운동 리스트 */}
      <div>
        
      </div>
      {/* 운동 추가 / 불러오기 */}
      <div>
        
      </div>
      {/* 하단 -> (과거 오늘, 미래) 버튼 구분*/}
      <div>
        
      </div>
    </div>
  )
};

export default TrainingData;