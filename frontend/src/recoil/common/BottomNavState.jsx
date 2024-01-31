import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

const bottomNavState = atom({
  key: "bottomNavState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export { bottomNavState };
