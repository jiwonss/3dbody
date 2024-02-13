import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import axios from "axios";
import { userState } from "../../recoil/common/UserState";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ChallengeMenuModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const { challengeId } = useParams();

  // 챌린지 삭제
  const onChallengeDeleteHandler = async (event) => {
    event.preventDefault();
    await axios.delete(`${baseUrl}api/challenge/${challengeId}`).then(() => {
      window.location.replace("/challenge");
    });
  };

  return (
    <Modal
      className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      isOpen={modalData.type === "challengeMenu"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="flex flex-wrap h-40 bg-white border-2 border-gray-400 w-60 rounded-xl">
        <div
          className="flex items-center justify-center w-full"
          onClick={() => setModalData({ type: null, data: null })}
        >
          {user.info.role === "ROLE_ADMIN" ? (
            <div
              className="flex flex-wrap items-center justify-center w-full gap-6"
              onClick={() => setModalData({ type: null, data: null })}
            >
              <div className="flex items-center justify-center w-full">
                <Link
                  to={`/challenge/${challengeId}/update`}
                  state={{ value: data }}
                  className="flex items-center justify-center w-10/12 h-10 text-white bg-teal-700 border-2 rounded-md"
                >
                  수정하기
                </Link>
              </div>
              <div className="flex items-center justify-center w-full">
                <button
                  onClick={onChallengeDeleteHandler}
                  className="w-10/12 h-10 text-white border-2 rounded-md bg-rose-600"
                >
                  삭제하기
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <p>권한이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

ChallengeMenuModal.propTypes = {
  onClose: PropTypes.func,
};

export default ChallengeMenuModal;
