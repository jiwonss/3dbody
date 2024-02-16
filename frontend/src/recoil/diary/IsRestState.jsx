import { atom } from "recoil";

const isRestState = atom({
  key: "isRestState",
  default: false,
});

export { isRestState };
