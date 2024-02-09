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
      className={"fixed bottom-0 w-full bg-white"}
      isOpen={modalData.type === "changeWeight"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("weight")} defaultValue={data} />
        <input type="button" onClick={onClose} value="취소" />
        <input type="submit" value="확인" />
      </form>
    </Modal>
  );
};

ChangeWeightModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default ChangeWeightModal;
