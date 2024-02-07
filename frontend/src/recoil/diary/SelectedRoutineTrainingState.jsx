import { atom } from "recoil";

const selectedRoutineTrainingState = atom({ // 루틴에 추가할 운동 목록 (id만)
  key: "selectedRoutineTrainingState",
  default: [],
});

export { selectedRoutineTrainingState };
