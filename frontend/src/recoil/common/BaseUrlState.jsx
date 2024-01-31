import { atom } from "recoil";

const baseUrlState = atom({
  key: "baseUrlState",
  default: "http://i10c204.p.ssafy.io:8082/",
});

export { baseUrlState };