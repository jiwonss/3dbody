import { atom } from "recoil";

const toggleDiaryState = atom({
  key: "toggleDiaryState",
  default: "left",
});

const toggleState = atom({
  key: "toggleState",
  default: "left",
});

const toggleModelState = atom({
  key: "toggleModelState",
  default: "left",
});

export { toggleDiaryState, toggleState, toggleModelState };
