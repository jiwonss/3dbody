import Modal from "react-modal";
import { modalState } from "../../recoil/modal/ModalState";
import { useRecoilState, useRecoilValue } from "recoil";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";

const ChangeNicknameModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const { register, handleSubmit, watch } = useForm({
    mode: "onSubmit",
  });
  const nickname = watch("nickname");

  const checkNickname = () => {
    axios({
      method: "get",
      url: `${baseUrl}api/users?nickname=${nickname}`,
      headers: { Authorization: `Bearer ${user.token}` },
    }).then((res) => {
      console.log(res);
    });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      className={"fixed bottom-0 w-full bg-white"}
      isOpen={modalData.type === "changeNickname"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <h1>닉네임을 변경해주세요</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex m-2">
          <input {...register("nickname")} type="text" defaultValue={data} />
          <input type="button" onClick={checkNickname} value={"중복검사"} />
        </div>
        <div className="flex m-2" >
          <input type="button" onClick={onClose} value={"취소"}/>
          <input type="submit" value="확인" />
        </div>
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
