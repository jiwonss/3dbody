import { useRecoilState } from "recoil";
import { modalState } from "./modalState";
import ChangeNicknameModal from "../../components/modal/ChangeNicknameModal";
import ChangeGenderModal from "../../components/modal/ChangeGenderModal";

const ModalManager = () => {
  const [modalName, setModalName] = useRecoilState(modalState);

  const closeModal = () => {
    setModalName(null);
  };

  switch (modalName) {
    case "changeNickname":
      return <ChangeNicknameModal onClose={closeModal} />;
    case "changeGender":
      return <ChangeGenderModal onClose={closeModal} />;
    default:
      return null;
  }
};

export default ModalManager;
