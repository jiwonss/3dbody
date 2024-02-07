import { atom } from "recoil";

const userHistoryState = atom({
  key: "userHistoryState",
  default: [],
});

export { userHistoryState };
