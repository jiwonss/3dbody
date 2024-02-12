import PropTypes from "prop-types";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Description from "../Description";
import { selectedRoutineState } from "../../../../recoil/diary/SelectedRoutineState";
import { selectedRoutineInfoState } from "../../../../recoil/diary/SelectedRoutineInfoState";
import { modalState } from "../../../../recoil/modal/ModalState";
import { baseUrlState } from "../../../../recoil/common/BaseUrlState";

const RoutineDetailBox = ({ data, idx }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const setModalData = useSetRecoilState(modalState);
  const setSelectedRoutine = useSetRecoilState(selectedRoutineState);
  const setSelectedRoutineInfo = useSetRecoilState(selectedRoutineInfoState);

  // 선택한 루틴 정보 가져오기
  const getRoutineDetail = async () => {
    setSelectedRoutineInfo(data);
    await axios
      .get(
        `${baseUrl}api/management/routine/detail?routine_id=${data.routineId}`
      )
      .then((res) => {
        console.log("루틴 디테일", res.data);
        setSelectedRoutine(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 루틴 상세 모달
  const onRoutineDetailHandler = () => {
    setModalData({ type: "routineDetail", data: "" });
  };

  // 루틴 편집 메뉴 모달
  const onRoutineDetailMenuHandler = () => {
    setModalData({ type: "routineEditMenu", data: "" });
  };

  return (
    <div className="flex justify-between" onClick={getRoutineDetail}>
      <div onClick={onRoutineDetailHandler}>
        <Description Title={data.title} subTitle={`${idx+1}번 운동 목록`} />
      </div>
      <EllipsisVerticalIcon
        className="w-6 h-6 my-auto"
        onClick={onRoutineDetailMenuHandler}
      />
    </div>
  );
};

RoutineDetailBox.propTypes = {
  data: PropTypes.object,
  idx: PropTypes.number,
};

export default RoutineDetailBox;
