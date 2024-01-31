import { atom } from "recoil";

const userTrainingState = atom({
  key: "userTrainingState",
  default: [],
});

export { userTrainingState };
