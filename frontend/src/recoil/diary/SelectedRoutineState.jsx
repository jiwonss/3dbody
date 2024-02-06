import { atom } from "recoil";

const selectedRoutineState = atom({ // 선택한 루틴 정보
  key: "selectedRoutineState",
  default: [],
});

export { selectedRoutineState };
