import axios from "axios";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import Input from "../common/Input";
import { useState } from "react";
import { userState } from "../../recoil/common/UserState";

const RoutineCreateModal = ({ onClose }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const [modalData, setModalData] = useRecoilState(modalState);
  const [routineName, setRoutineName] = useState("");

  const onChangeRoutineName = (e) => {
    setRoutineName(e.target.value)
  }

  const getPostRoutine = async () => {
    await axios
      .post(`${baseUrl}api/management/routine/addroutine`, {
        userId: user.info.userId,
        title: routineName
      })
      .then((res) => {
        console.log("루틴 생성 성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitHandler = () => {
    getPostRoutine()
  }

  return (
    <Modal
      className={"fixed transform -translate-y-1/2 top-1/2 inset-x-8"}
      isOpen={modalData.type === "routineCreate"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <form className="flex flex-col gap-4 p-4 bg-white border-2 border-gray-400 rounded-xl" onSubmit={onSubmitHandler}>
        <p className="mx-auto font-semibold">새로운 루틴 만들기</p>
        <div className="flex flex-col gap-2">
          <p>나만의 루틴을 만들어보세요!</p>
          <Input value={routineName} onChange={onChangeRoutineName} placeholder={"루틴 이름을 입력하세요"} />
        </div>
        <div className="flex gap-2">
          <input type="button" onClick={onClose} value={"취소"} className="bg-white border border-teal-700 rounded-md" />
          <input type="submit" value={"루틴 생성"} className="p-2 text-white bg-teal-700 rounded-md" />
        </div>
      </form>
    </Modal>
  );
};

RoutineCreateModal.propTypes = {
  onClose: PropTypes.func,
};

export default RoutineCreateModal;