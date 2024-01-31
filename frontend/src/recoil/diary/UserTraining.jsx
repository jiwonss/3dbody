import { atom } from "recoil";

const userTrainingState = atom({
  key: "userTrainingState", // 선택한 날의 연, 월, 일
  default: [],
});

export { userTrainingState };
