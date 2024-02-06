import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Description from "./Description";
import Button from "../../common/Button";
import NextButton from "../../common/NextButton";
import { selectedDateState, selectedDayState } from "../../../recoil/diary/SelectedDateState";
import { isRestState } from "../../../recoil/diary/IsRestState";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import { userState } from "../../../recoil/common/UserState";

const Plan = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const setIsRest = useSetRecoilState(isRestState);
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedDay = useRecoilValue(selectedDayState);

  const onClickHandler = () => {
    const postIsRest = async () => {
      await axios
        .post(
          `${baseUrl}api/management/training/rest?user_id=${user.info.userId}&year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`
        )
        .then((res) => {
          console.log(res.data);
          setIsRest(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    postIsRest();
  };

  return (
    <div className="flex flex-col gap-4 m-4">
      <div>
        <Description
          Title={`${selectedDate[1]}월 ${selectedDate[2]}일 ${selectedDay}`}
          subTitle={"운동을 직접 계획해보세요!"}
        />
        <div className="w-full">
          <div className="flex justify-center gap-4 my-4">
            <div className="p-1 text-center border border-teal-700 rounded-md basis-1/2">
              <Link to={`/diary/training/load/basic`}>
                <Button buttonName="불러오기" />
              </Link>
            </div>
            <div className="p-1 text-center text-white bg-teal-700 rounded-md basis-1/2">
              <Link to={`/diary/training/choice/basic`}>
                <Button buttonName="운동 선택하기" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="relative">
        <Link to={`/diary/training/myroutine`}>
          <div className="absolute right-0">
            <NextButton />
          </div>
          <Description Title={"나만의 루틴"} subTitle={"루틴을 선택해주세요."} />
        </Link>
      </div>

      <div className="text-center">
        <p onClick={onClickHandler} className="text-base text-gray-500 underline">
          오늘은 쉴래요! 😥
        </p>
      </div>
    </div>
  );
};

export default Plan;
