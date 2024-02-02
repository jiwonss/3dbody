import Modal from "react-modal";
import { modalState } from "../../recoil/modal/ModalState";
import { useRecoilState } from "recoil";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import axios from "axios";

const ChangeGenderModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilState(baseUrlState);
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = () => {
    console.log("앙")
  };
  return (
    <Modal
      className={"absolute p-5  bg-red-200 overflow-auto inset"}
      isOpen={modalData.type === "changeGender"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({type:null, data:null})}
    >
      <h1>성별을 알려주세요</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("gender")}>
          <option value="now" selected>{data}</option>
          <option value="another">{ data === "남자" ? "여자" : "남자"}</option>
        </select>
        <button onClick={onClose}>취소</button>
        <input type="submit" value={"확인"} />
      </form>
    </Modal>
  );
};

ChangeGenderModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default ChangeGenderModal;
