import Modal from "react-modal";
import { modalState } from "../../recoil/modal/ModalState";
import { useRecoilState } from "recoil";
import { PropTypes } from "prop-types";

const SelfInputFoodModal = ({ onClose }) => {
  const [modalData, setModalData] = useRecoilState(modalState);

  return (
    <Modal
      className={"fixed bottom-0 bg-red-200 overflow-auto inset"}
      isOpen={modalData.type === "selfInputFood"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({type: null, data: null})}
    >
      <div>
        <p>음식 직접입력</p>
        <div>
          
        </div>
        <div>
          <button onClick={onClose}>취소</button>
          <button>추가하기</button>
        </div>
      </div>
    </Modal>
  );
};

SelfInputFoodModal.propTypes = {
  onClose: PropTypes.func,
};

export default SelfInputFoodModal;
