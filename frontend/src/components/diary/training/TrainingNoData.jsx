import { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

import { selectedDateState } from "../../../recoil/diary/SelectedDateState";
import { isRestState } from "../../../recoil/diary/IsRestState";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";
import Rest from "./Rest";
import Plan from "./Plan";

const TrainingNoData = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const [isRest, setIsRest] = useRecoilState(isRestState);
  const baseUrl = useRecoilValue(baseUrlState);

  // const getIsRest = async () => {
  //   await axios.get(
  //     `${baseUrl}management/calendar/day/rest/${id}?year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`
  //   ).then(res => {
  //     setIsRest(res)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // };

  // useEffect(() => {
  //   getIsRest()
  // }, [])

  // const postIsRest = async () => {
  //   await axios.post(
  //     `${baseUrl}management/calendar/day/rest/${id}?year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`, {
  //       is_rest: isRest,
  //     }
  //   ).then(res => {
  //     console.log(res.data);
  //     console.log("성공");
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // };

  // useEffect(() => {
  //   postIsRest()
  // }, [isRest])

  return (
    <>
      {isRest ? <Rest /> : <Plan />}
    </>
  );
};

export default TrainingNoData;
