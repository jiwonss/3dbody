import { useRecoilState } from "recoil";
import { modalState } from "./ModalState";
import ChangeNicknameModal from "../../components/modal/ChangeNicknameModal";
import ChangeGenderModal from "../../components/modal/ChangeGenderModal";

const ModalManager = () => {
  const [modalData, setModalData] = useRecoilState(modalState);

  const closeModal = () => {
    setModalData({type: null, data:null});
  };
  // 화면에 띄울 모달 설정 recoil에 이름으로 저장 해서 해당 이름에 맞는 작성한 모달 컴포넌트 호출
  switch (modalData.type) {
    case "changeNickname":
      return <ChangeNicknameModal onClose={closeModal} data={modalData.data}/>;
    case "changeGender":
      return <ChangeGenderModal onClose={closeModal} data={modalData.data}/>;
    default:
      return null;
  }
};

export default ModalManager;
