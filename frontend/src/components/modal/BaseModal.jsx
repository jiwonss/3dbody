import Modal from "react-modal";
import { modalState } from "../../recoil/modal/modalState";
import { useRecoilState } from "recoil";

const BaseModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  return (
    <Modal
      className={"fixed bottom-0 w-full bg-white"}
      isOpen={modal}
      ariaHideApp={false}
      onRequestClose={() => setModal(false)}
    >
      <button onClick={setModal(false)}>취소</button>
      <button>확인</button>
    </Modal>
  );
};

export default BaseModal;
