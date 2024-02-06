import { atom } from "recoil";

const userCategoryFoodState = atom({
  // 선택 카테고리 식단 정보
  key: "userCategoryFoodState",
  default: [],
});

export { userCategoryFoodState };
