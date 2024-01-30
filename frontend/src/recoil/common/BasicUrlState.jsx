import { atom } from "recoil";

const BasicUrlState = atom({
  key: "basicUrlState",
  default: "http://i10c204.p.ssafy.io:8082/",
});

export { BasicUrlState };