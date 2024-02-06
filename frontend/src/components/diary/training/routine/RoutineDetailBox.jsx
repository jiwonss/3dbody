import PropTypes from "prop-types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Description from "../Description";
import { useSetRecoilState } from "recoil";
import { selectedRoutineState } from "../../../../recoil/diary/SelectedRoutineState";

const RoutineDetailBox = ({ data }) => {
  const setSelectedRoutine = useSetRecoilState(selectedRoutineState);
  
  const onClickRoutine = () => {
    setSelectedRoutine(data)
  }

  return (
    <div className="flex justify-between" onClick={onClickRoutine}>
      <div>
        <Description
          Title={data.title}
          subTitle={"루틴에 등록된 카테고리 목록"}
        />
      </div>
      <EllipsisVerticalIcon className="w-6 h-6 my-auto" />
    </div>
  );
};

RoutineDetailBox.propTypes = {
  data: PropTypes.object,
};

export default RoutineDetailBox;
