import { atom } from "recoil";

const selectedRoutineState = atom({ // 선택한 루틴 운동 목록 정보
  key: "selectedRoutineState",
  default: [],
});

export { selectedRoutineState };
