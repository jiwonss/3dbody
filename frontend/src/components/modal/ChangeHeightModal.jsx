import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import axios from "axios";
import { userState } from "../../recoil/common/UserState";
import Modal from "react-modal";
import { modalState } from "../../recoil/modal/ModalState";
import { PropTypes } from 'prop-types';

const ChangeHeightModal = ({ onClose, data }) => {
  const { register, handleSubmit, watch } = useForm({
    mode: "onSubmit",
  });
  const baseUrl = useRecoilValue(baseUrlState);
  const [modalData, setModalData] = useRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const height = watch("height");

  const onSubmit = () => {
    axios({
      method: "patch",
      url: `${baseUrl}api/users/${user.info.userId}/height`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        "height": height,
      },
    }).then((res) => {
      if (res.data.data_header.success_code === 0 ){
        setUser({
          token: user.token,
          info: { ...user.info, height: height },
        });
        setModalData({ type: null, data: null });
      }
    });
  };

  return (
    <Modal
      className={"fixed transform -translate-y-1/2 top-1/2 inset-x-12"}
      isOpen={modalData.type === "changeHeight"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="p-4 bg-white border-2 border-gray-400 rounded-xl">
        <p className="mb-4 font-semibold text-center">신장</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex justify-center gap-4">
            <input type="text" {...register("height")} defaultValue={data} className="w-1/3 p-1 text-center border border-gray-400 rounded-md"/>
            <p>cm</p>
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


ChangeHeightModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default ChangeHeightModal;
