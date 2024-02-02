import Modal from "react-modal";
import { modalState } from "../../recoil/modal/modalState";
import { useRecoilState } from "recoil";
import { PropTypes } from "prop-types";

const ChangeNicknameModal = ({ onClose }) => {
  const [modalName, setModalName] = useRecoilState(modalState);

  return (
    <Modal
      className={"fixed bottom-0 w-full bg-white"}
      isOpen={modalName === "changeNickname"}
      ariaHideApp={false}
      onRequestClose={() => setModalName(null)}
    >
      닉네임 변경
      <button onClick={onClose}>취소</button>
      <button>확인</button>
    </Modal>
  );
};

ChangeNicknameModal.propTypes = {
  onClose: PropTypes.func,
};

export default ChangeNicknameModal;
