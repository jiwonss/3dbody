import { atom } from "recoil";
import BaseModal from "../../components/modal/BaseModal";

const modalState = atom({
  key: "modalState",
  default: {
    isopen: true,
    component: <BaseModal/>
  },
});

export { modalState };
