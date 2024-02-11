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
    console.log("앙");
  };
  return (
    <Modal
      className={"fixed transform  -translate-y-1/2 top-1/2 inset-x-12"}
      isOpen={modalData.type === "changeGender"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="p-4 bg-white border-2 border-gray-400 rounded-xl">
        <h1 className="mb-4 font-semibold text-center">성별을 알려주세요</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-center">
            <select {...register("gender")} className="p-2 text-center border border-gray-400 rounded-md">
              <option value="now" selected>
                {data}
              </option>
              <option value="another">{data === "남자" ? "여자" : "남자"}</option>
            </select> 
          </div>
          <div className="flex gap-2 m-2">
            <input type="button" onClick={onClose} value={"취소"} className="p-1 border border-teal-700 rounded-md"/>
            <input type="submit" value={"확인"} className="p-1 text-white bg-teal-700 rounded-md"/>    
          </div>
        </form>
      </div>
    </Modal>
  );
};

ChangeGenderModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default ChangeGenderModal;
