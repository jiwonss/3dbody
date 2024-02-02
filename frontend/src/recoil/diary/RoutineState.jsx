import { atom } from "recoil";

const RoutineState = atom({ // 선택한 루틴 정보
  key: "RoutineState",
  default: {},
});

export { RoutineState };
