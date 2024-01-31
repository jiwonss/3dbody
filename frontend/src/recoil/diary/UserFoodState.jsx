import { atom } from "recoil";

const userFoodState = atom({
  key: "userFoodState",
  default: [],
});

export { userFoodState };
