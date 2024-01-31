import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userInfo",
  storage: localStorage,
});

const userState = atom({
  key: "userInfo",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export { userState };
