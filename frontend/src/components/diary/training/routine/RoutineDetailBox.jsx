import PropTypes from "prop-types";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Description from "../Description";
import { selectedRoutineState } from "../../../../recoil/diary/SelectedRoutineState";
import { selectedRoutineInfoState } from "../../../../recoil/diary/SelectedRoutineInfoState";
import { modalState } from "../../../../recoil/modal/ModalState";
import { baseUrlState } from "../../../../recoil/common/BaseUrlState";

const RoutineDetailBox = ({ data }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const setModalData = useSetRecoilState(modalState);
  const setSelectedRoutine = useSetRecoilState(selectedRoutineState);
  const setSelectedRoutineInfo = useSetRecoilState(selectedRoutineInfoState);

  // 선택한 루틴 정보 가져오기
  const getRoutineDetail = async () => {
    setSelectedRoutineInfo(data);
    await axios
      .get(`${baseUrl}api/management/routine/detail/${data.routineId}`)
      .then((res) => {
        console.log("루틴 디테일", res);
        setSelectedRoutine(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 루틴 편집 메뉴 모달
  const onRoutineDetailMenuHandler = () => {
    setModalData({ type: "routineEditMenu", data: "" });
  };

  return (
    <div className="flex justify-between" onClick={getRoutineDetail}>
      <div>
        <Description Title={data.title} subTitle={"루틴에 등록된 카테고리 목록"} />
      </div>
      <EllipsisVerticalIcon className="w-6 h-6 my-auto" onClick={onRoutineDetailMenuHandler} />
    </div>
  );
};

RoutineDetailBox.propTypes = {
  data: PropTypes.object,
};

export default RoutineDetailBox;
