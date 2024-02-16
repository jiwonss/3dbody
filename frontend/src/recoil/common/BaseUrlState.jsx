import { atom } from "recoil";

const baseUrlState = atom({
  key: "baseUrlState",
  default: "https://i10c204.p.ssafy.io/",
});

export { baseUrlState };