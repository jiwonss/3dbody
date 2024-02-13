import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import axios from "axios";
import { userState } from "../../recoil/common/UserState";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const PinNumberModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const [pinNumber, setPinNumber] = useState("")
  
  const onPinNumberHandler = (event) => {
    setPinNumber(event.currentTarget.value)
  }

  return (
    <Modal
      className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      isOpen={modalData.type === "pinNumber"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="flex flex-wrap h-40 bg-white border-2 border-gray-400 w-60 rounded-xl">
        <div
          className="flex items-center justify-center w-full"
          onClick={() => setModalData({ type: null, data: null })}
        >
          {user.info.pin ? (
            <div className="flex flex-wrap justify-center">
              <div>핀번호를 입력하세요</div>
              <form className="flex flex-wrap justify-center">
                <input
                  type="password"
                  className="w-10/12 p-1 mt-1 bg-gray-200 rounded-md"
                  placeholder="핀 번호를 입력해주세요"
                />
                <button
                  type="submit"
                  className="w-1/2 p-1 mt-2 text-white bg-teal-700 rounded-md"
                >
                  입력
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center">
              <div>핀번호를 생성하세요</div>
              <form className="flex flex-wrap justify-center">
                <input
                  type="password"
                  value={pinNumber}
                  onChange={onPinNumberHandler}
                  className="w-10/12 p-1 mt-1 bg-gray-200 rounded-md"
                  placeholder="핀 번호를 입력해주세요"
                />
                <input
                  type="password"
                  className="w-10/12 p-1 mt-1 bg-gray-200 rounded-md"
                  placeholder="다시 한번 입력해주세요"
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
