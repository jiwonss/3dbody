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
      기본
    </Modal>
  );
};

export default BaseModal;
