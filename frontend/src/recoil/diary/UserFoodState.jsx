import { atom } from "recoil";

const userFoodState = atom({
  key: "userFoodState",
  default: [],
});

const calorieState = atom({
  key: "calorieState",
  default: 0,
});

const carbohydrateState = atom({
  key: "carbohydrateState",
  default: 0
});

const proteinState = atom({
  key: "proteinState",
  default: 0
});

const lipidState = atom({
  key: "lipidState",
  default: 0
});

export { userFoodState, calorieState, carbohydrateState, proteinState, lipidState };
