import { atom } from "recoil";
import BaseModal from "../../components/modal/BaseModal";

const modalComponent = atom({
  key: "modalComponent",
  default: <BaseModal/>,
});

export { modalComponent };
