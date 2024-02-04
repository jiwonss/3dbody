import { atom } from "recoil";

const userFoodCategoryState = atom({
  // 선택 카테고리 식단 정보
  key: "userFoodCategoryState",
  default: [],
});

export { userFoodCategoryState };
