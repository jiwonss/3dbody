import { atom } from "recoil";

const toggleState = atom({
  key: "toggleState",
  default: "left",
});

export { toggleState };
