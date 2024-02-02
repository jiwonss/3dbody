import { useRecoilState } from "recoil";
import { modalState } from "./modalState";
import ChangeNicknameModal from "../../components/modal/ChangeNicknameModal";
import ChangeGenderModal from "../../components/modal/ChangeGenderModal";

const ModalManager = () => {
  const [modalName, setModalName] = useRecoilState(modalState);

  const closeModal = () => {
    setModalName(null);
  };
  // 화면에 띄울 모달 설정 recoil에 이름으로 저장 해서 해당 이름에 맞는 작성한 모달 컴포넌트 호출
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
