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
    <div className="flex">
      <p
        className={`${isSelected === "left" ? "font-bold" : null}`}
        onClick={() => onClickLeftSelected()}
      >
        {leftTitle}
      </p>
      <p
        className={`${isSelected === "right" ? "font-bold" : null}`}
        onClick={() => onClickRightSelected()}
      >
        {rightTitle}
      </p>
    </div>
  );
};

ToggleTap.propTypes = {
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  state: PropTypes.object,
};

// const ToggleTap = () => {
//   const [isLeftSelected, SetisLeftSelected] = useState(true);
//   const [isRightSelected, SetisRightSelected] = useState(false);

//   const onClick = () => {
//     SetisLeftSelected(!isLeftSelected);
//     SetisRightSelected(!isRightSelected);
//     console.log(isLeftSelected);
//     console.log(isRightSelected);
//   };

//   let leftCheck = "small";
//   let rightCheck = "large";

//   if (isLeftSelected) {
//     leftCheck = "small";
//   } else {
//     leftCheck = "large";
//   }

//   if (isRightSelected) {
//     rightCheck = "small";
//   } else {
//     rightCheck = "large";
//   }

//   return (
//     <div>
//       <Button buttonStyle={leftCheck} buttonName="캘린더" onClick={onClick} />
//       <Button buttonStyle={rightCheck} buttonName="그래프" onClick={onClick} />
//     </div>
//   );
// };

export default ToggleTap;
