import { atom } from "recoil";

const inbodyListState = atom({
  key: "inbodyListState",
  default: [],
});

const selectedInbodyState = atom({
  key: "selectedInbodyState",
  default: [],
});

const targetInbodyState = atom({
  key: "targetInbodyState",
  default: [],
});

export { inbodyListState, selectedInbodyState, targetInbodyState };