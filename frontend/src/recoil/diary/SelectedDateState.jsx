import { atom } from "recoil";

const today = new Date();

const selectedDateState = atom({
  key: "selectedDateState", // 선택한 날의 연, 월, 일
  default: [today.getFullYear(), today.getMonth() + 1, today.getDate()],
});

export { selectedDateState };
