import { atom } from "recoil";

const selectedRoutineInfoState = atom({ // 선택한 루틴 인포 ( 타이틀, id )
  key: "selectedRoutineInfoState",
  default: [],
});

export { selectedRoutineInfoState };
