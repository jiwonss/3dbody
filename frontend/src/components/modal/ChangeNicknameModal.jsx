import Modal from "react-modal";
import { modalState } from "../../recoil/modal/ModalState";
import { useRecoilState } from "recoil";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";

const ChangeNicknameModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const {register} = useForm({
    mode: "onSubmit"
  })

  return (
    <Modal
      className={"fixed bottom-0 w-full bg-white"}
      isOpen={modalData.type === "changeNickname"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <h1>닉네임을 변경해주세요</h1>
      <form>
        <input {...register}type="text" defaultValue={data} />
        <button onClick={onClose}>취소</button>
        <input type="submit" value="확인" />
      </form>
    </Modal>
  );
};

ChangeNicknameModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

ChangeNicknameModal.propTypes = {
  onClose: PropTypes.func,
};

export default ChangeNicknameModal;
