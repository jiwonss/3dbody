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
      className={"fixed bottom-0 w-full bg-white"}
      isOpen={modalData.type === "changeHeight"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("height")} defaultValue={data} />
        <input type="button" onClick={onClose} value="취소" />
        <input type="submit" value="확인" />
      </form>
    </Modal>
  );
};


ChangeHeightModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default ChangeHeightModal;
