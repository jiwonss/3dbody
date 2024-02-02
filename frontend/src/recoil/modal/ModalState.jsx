import { atom } from "recoil";

const modalState = atom({
  key: "modalState",
  default: {
    type: null,
    data: null,
  },
});

export { modalState };
