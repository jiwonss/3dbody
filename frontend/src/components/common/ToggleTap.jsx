import PropTypes from "prop-types";
import { useRecoilState } from "recoil";

const ToggleTap = ({ leftTitle, rightTitle, state }) => {
  const [isSelected, setIsSelected] = useRecoilState(state);

  // 정보 선택 함수
  const onClickLeftSelected = () => {
    setIsSelected("left");
  };

  // 댓글 선택 함수
  const onClickRightSelected = () => {
    setIsSelected("right");
  };

  return (
    <div className="m-4">
      <div className="flex w-full border border-teal-700 rounded-md">
        <div
          className={`w-1/2 text-center ${isSelected === "left" ? "bg-teal-700 text-white rounded" : null}`}
          onClick={() => onClickLeftSelected()}
        >
          {leftTitle}
        </div>
        <div
          className={`w-1/2 text-center ${isSelected === "right" ? "bg-teal-700 text-white rounded" : null}`}
          onClick={() => onClickRightSelected()}
        >
          {rightTitle}
        </div>
      </div>
    </div>
  );
};

ToggleTap.propTypes = {
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  state: PropTypes.object,
};

export default ToggleTap;
