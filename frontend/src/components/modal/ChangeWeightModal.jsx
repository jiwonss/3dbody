import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import axios from "axios";
import { userState } from "../../recoil/common/UserState";
import Modal from "react-modal";
import { modalState } from "../../recoil/modal/ModalState";
import { PropTypes } from "prop-types";

const ChangeWeightModal = ({ onClose, data }) => {
  const { register, handleSubmit, watch } = useForm({
    mode: "onSubmit",
  });
  const baseUrl = useRecoilValue(baseUrlState);
  const [modalData, setModalData] = useRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const weight = watch("weight");

  const onSubmit = () => {
    axios({
      method: "patch",
      url: `${baseUrl}api/users/${user.info.userId}/weight`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        weight: weight,
      },
    }).then((res) => {
      if (res.data.data_header.success_code === 0) {
        setUser({
          token: user.token,
          info: { ...user.info, weight: weight },
        });
        setModalData({ type: null, data: null });
      } else {
        setModalData({ type: null, data: null });
      }
    });
  };

  return (
    <Modal
      className={"fixed transform -translate-y-1/2 top-1/2 inset-x-12"}
      isOpen={modalData.type === "changeWeight"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="p-4 bg-white border-2 border-gray-400 rounded-xl">
        <p className="mb-4 font-semibold text-center">체중</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex justify-center gap-4">
            <input type="text" {...register("weight")} defaultValue={data} className="w-1/3 p-1 text-center border border-gray-400 rounded-md"/>
            <p>kg</p>
          </div>
          <div className="flex gap-2 m-2">
            <input type="button" onClick={onClose} value="취소" className="p-1 border border-teal-700 rounded-md"/>
            <input type="submit" value="확인" className="p-1 text-white bg-teal-700 rounded-md"/>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ChangeWeightModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default ChangeWeightModal;
