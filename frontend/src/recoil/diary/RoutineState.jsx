import { atom } from "recoil";

const routineState = atom({ // 선택한 루틴 정보
  key: "routineState",
  default: {},
});

export { routineState };
