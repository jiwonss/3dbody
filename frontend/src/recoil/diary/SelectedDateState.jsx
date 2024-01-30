import { atom } from "recoil";

const today = new Date();

const selectedDateState = atom({
  key: "selectedDate", // 선택한 날의 연, 월, 일
  default: [today.getFullYear(), today.getMonth(), today.getDate()],
});

export { selectedDateState };
