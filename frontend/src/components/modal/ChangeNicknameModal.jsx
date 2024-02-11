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
      className={"fixed transform -translate-y-1/2 top-1/2 inset-x-12"}
      isOpen={modalData.type === "changeNickname"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="p-4 bg-white border-2 border-gray-400 rounded-xl">
        <h1 className="mb-4 font-semibold text-center">닉네임 변경</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex gap-2 m-2">
            <input
              placeholder="닉네임을 변경해주세요"
              {...register("nickname")}
              type="text"
              defaultValue={data}
              className="p-2 text-sm text-center border border-gray-400 rounded-md"
            />
            <input type="button" onClick={checkNickname} value={"중복검사"} className="w-1/3 p-1 bg-gray-400 rounded-md"/>
          </div>
          <div className="flex gap-2 m-2">
            <input type="button" onClick={onClose} value={"취소"} className="p-1 border border-teal-700 rounded-md"/>
            <input type="submit" value="확인" className="p-1 text-white bg-teal-700 rounded-md"/>
          </div>
        </form> 
      </div>
    </Modal>
  );
};

ChangeNicknameModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default ChangeNicknameModal;
