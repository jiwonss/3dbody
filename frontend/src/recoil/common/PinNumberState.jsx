import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "pinNumber",
  storage: sessionStorage,
});

const pinNumberState = atom({
  key: "pinNumber",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export { pinNumberState };
