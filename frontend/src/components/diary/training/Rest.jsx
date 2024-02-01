import { useSetRecoilState } from "recoil";
import { isRestState } from "../../../recoil/diary/IsRestState";

const Rest = () => {
  const setIsRest = useSetRecoilState(isRestState);

  const onClickHandler = () => {
    setIsRest(false);
  };

  return (
    <div className="flex flex-col items-center mt-48">
      <img src="" alt="img" />
      <p>오늘은 운동 쉬는 날!</p>
      <p onClick={onClickHandler} className="text-gray-500 underline ">
        휴식 취소
      </p>
    </div>
  );
};

export default Rest;
