import { atom } from "recoil";

const toggleDiaryState = atom({
  key: "toggleDiaryState",
  default: "left",
});

const toggleState = atom({
  key: "toggleState",
  default: "left",
});

export { toggleDiaryState, toggleState };
