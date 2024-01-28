import Button from "./Button";
import { useState } from "react";

const ToggleTap = () => {
  const [isLeftSelected, SetisLeftSelected] = useState(true);
  const [isRightSelected, SetisRightSelected] = useState(false);

  const onClick = () => {
    SetisLeftSelected(!isLeftSelected);
    SetisRightSelected(!isRightSelected);
    console.log(isLeftSelected);
    console.log(isRightSelected);
  };

  let leftCheck = "small";
  let rightCheck = "large";

  if (isLeftSelected) {
    leftCheck = "small";
  } else {
    leftCheck = "large";
  }

  if (isRightSelected) {
    rightCheck = "small";
  } else {
    rightCheck = "large";
  }

  return (
    <div>
      <Button buttonStyle={leftCheck} buttonName="캘린더" onClick={onClick} />
      <Button buttonStyle={rightCheck} buttonName="그래프" onClick={onClick} />
    </div>
  );
};

export default ToggleTap;
