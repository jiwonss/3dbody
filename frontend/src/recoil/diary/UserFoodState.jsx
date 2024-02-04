import { atom } from "recoil";

const userFoodState = atom({
  // 선택 날짜 식단 정보
  key: "userFoodState",
  default: [],
});

export { userFoodState };
