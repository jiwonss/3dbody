import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import axios from "axios";
import { userState } from "../../recoil/common/UserState";
import { useState } from "react";
import { pinNumberState } from '../../recoil/common/PinNumberState';

const PinNumberModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const [user, setUser] = useRecoilState(userState);
  const [newPinNumber, setNewPinNumber] = useState("");
  const [newPinNumberCheck, setNewPinNumberCheck] = useState("");
  const [pinNumber, setPinNumber] = useState("");
  const [pin, setPin] = useRecoilState(pinNumberState)

  // PIN 번호 생성 핸들러
  const onNewPinNumberHandler = (event) => {
    setNewPinNumber(event.currentTarget.value);
  };
  // PIN 번호 확인 핸들러
  const onNewPinNumberCheckHandler = (event) => {
    setNewPinNumberCheck(event.currentTarget.value);
  };

  const onCreatePinNumberHandler = (event) => {
    event.preventDefault();
    if (newPinNumber !== newPinNumberCheck) {
      alert("PIN 번호가 일치하지 않습니다.");
    } else {
      axios({
        method: "post",
        url: `${baseUrl}api/users/${user.info.userId}/pin`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: { new_pin: newPinNumber, new_pin_check: newPinNumberCheck },
      }).then(() => {
        setUser({
          token: user.token,
          info: { ...user.info, pin: newPinNumber },
        });
        alert("PIN 번호가 등록 되었습니다.");
        setModalData({ type: null, data: null });
      });
    }
  };

  // 핀번호 입력하기
  const onPinNumberHandler = (event) => {
    setPinNumber(event.currentTarget.value);
  };
  const onPinNumberSubmitHandler = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${baseUrl}api/users/${user.info.userId}/pin/check`,
      headers: { Authorization: `Bearer ${user.token}` },
      data: { current_pin: pinNumber },
    }).then((res) => {
      // console.log(res.data.data_header.success_code);
      if (res.data.data_header.success_code === 1) {
        alert("PIN 번호가 일치하지 않습니다.");
      } else {
        setPin(true)
        setModalData({ type: null, data: null });
      }
    });
  };

  return (
    <Modal
      className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      isOpen={modalData.type === "pinNumber"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="flex flex-wrap h-40 bg-white border-2 border-gray-400 w-60 rounded-xl">
        <div className="flex items-center justify-center w-full">
          {user.info.pin ? (
            <div className="flex flex-wrap justify-center">
              <div>핀번호를 입력하세요</div>
              <form
                className="flex flex-wrap justify-center"
                onSubmit={onPinNumberSubmitHandler}
              >
                <input
                  type="password"
                  value={pinNumber}
                  onChange={onPinNumberHandler}
                  className="w-10/12 p-1 mt-1 bg-gray-200 rounded-md"
                  placeholder="핀 번호를 입력해주세요"
                  maxLength="6"
                  minLength="6"
                />
                <button
                  type="submit"
                  className="w-1/3 p-1 mt-2 text-white bg-teal-700 rounded-md"
                >
                  입력
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center">
              <div>핀번호를 생성하세요</div>
              <form
                className="flex flex-wrap justify-center"
                onSubmit={onCreatePinNumberHandler}
              >
                <input
                  type="password"
                  value={newPinNumber}
                  onChange={onNewPinNumberHandler}
                  className="w-10/12 p-1 mt-1 bg-gray-200 rounded-md"
                  placeholder="핀 번호를 입력해주세요"
                  maxLength="6"
                  minLength="6"
                />
                <input
                  type="password"
                  value={newPinNumberCheck}
                  onChange={onNewPinNumberCheckHandler}
                  className="w-10/12 p-1 mt-1 bg-gray-200 rounded-md"
                  placeholder="다시 한번 입력해주세요"
                  maxLength="6"
                  minLength="6"
                />
                <button
                  type="submit"
                  className="w-1/2 p-1 mt-2 text-white bg-teal-700 rounded-md"
                >
                  생성하기
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

PinNumberModal.propTypes = {
  onClose: PropTypes.func,
};

export default PinNumberModal;
