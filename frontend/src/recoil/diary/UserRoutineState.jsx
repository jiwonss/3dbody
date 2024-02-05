import { atom } from "recoil";

const userRoutineState = atom({
  key: "userRoutineState",
  default: [],
});

export { userRoutineState };
