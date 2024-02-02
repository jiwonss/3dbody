import Modal from "react-modal";
import { modalState } from "../../recoil/modal/modalState";
import { useRecoilState } from "recoil";
import { PropTypes } from "prop-types";

const ChangeGenderModal = ({ onClose }) => {
  const [modalName, setModalName] = useRecoilState(modalState);

  return (
    <Modal
      className={"absolute p-5  bg-red-200 overflow-auto inset"}
      isOpen={modalName === "changeGender"}
      ariaHideApp={false}
      onRequestClose={() => setModalName(null)}
    >
      <input type="text" />
      <p>밥이 넘어가니</p>
      성별 변경
      <button onClick={onClose}>취소</button>
      <button>확인</button>
    </Modal>
  );
};

ChangeGenderModal.propTypes = {
  onClose: PropTypes.func,
};

export default ChangeGenderModal;
