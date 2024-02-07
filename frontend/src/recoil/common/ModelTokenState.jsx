import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "token",
  storage: localStorage,
});

const modelTokenState = atom({
  key: "token",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export { modelTokenState };
