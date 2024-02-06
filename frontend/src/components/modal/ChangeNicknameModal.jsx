import Modal from "react-modal";
import { modalState } from "../../recoil/modal/ModalState";
import { useRecoilState, useRecoilValue } from "recoil";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import axios from "axios";

const ChangeNicknameModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const [user, setUser] = useRecoilState(userState);
  const { register, handleSubmit, watch } = useForm({
    mode: "onSubmit",
  });
  const nickname = watch("nickname");

  const checkNickname = () => {
    axios({
      method: "get",
      url: `${baseUrl}api/users/${user.info.userId}/nickname?nickname=${nickname}`,
      headers: { Authorization: `Bearer ${user.token}` },
    }).then((res) => {
      if (res.data.data_header.success_code === 0) {
        alert("변경 가능합니다.");
      } else {
        alert("닉네임이 중복됩니다");
      }
    });
  };

  const onSubmit = (data) => {
    axios({
      method: "patch",
      url: `${baseUrl}api/users/${user.info.userId}/nickname`,
      headers: { Authorization: `Bearer ${user.token}` },
      data: { nickname: data.nickname },
    }).then(() => {
      setUser({
        token: user.token,
        info: { ...user.info, nickname: data.nickname },
      });
      setModalData({ type: null, data: null });
    });
  };

  return (
    <Modal
      className={"fixed bottom-0 w-full bg-white"}
      isOpen={modalData.type === "changeNickname"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <h1>닉네임 변경</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex m-2">
          <input
            placeholder="닉네임을 변경해주세요"
            {...register("nickname")}
            type="text"
            defaultValue={data}
          />
          <input type="button" onClick={checkNickname} value={"중복검사"} />
        </div>
        <div className="flex m-2">
          <input type="button" onClick={onClose} value={"취소"} />
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

export default ChangeNicknameModal;
