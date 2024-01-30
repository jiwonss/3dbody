import { atom } from "recoil";

const bottomNavState = atom({
  key: "bottomNavState",
  default: "Home",
});

export { bottomNavState };
