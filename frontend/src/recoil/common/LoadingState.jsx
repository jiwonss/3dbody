import { atom } from "recoil";

const loadingState = atom({
  key: "loadingState",
  default: false,
});

export { loadingState };