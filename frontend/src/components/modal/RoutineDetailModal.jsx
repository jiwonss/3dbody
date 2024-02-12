import axios from "axios";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { modalState } from "../../recoil/modal/ModalState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import { selectedRoutineState } from "../../recoil/diary/SelectedRoutineState";
import { selectedRoutineInfoState } from "../../recoil/diary/SelectedRoutineInfoState";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";

const RoutineDetailModal = ({ onClose }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const selectedDate = useRecoilValue(selectedDateState);
  const [modalData, setModalData] = useRecoilState(modalState);
  const selectedRoutine = useRecoilValue(selectedRoutineState);
  const selectedRoutineInfo = useRecoilValue(selectedRoutineInfoState);
  const navigate = useNavigate()

  const postRoutineBySelectedDate = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `${baseUrl}api/management/routine/addTrainings?user_id=${user.info.userId}&routine_id=${selectedRoutine.routineId}&year=${selectedDate[0]}&month=${selectedDate[1]}&day=${selectedDate[2]}`
      )
      .then((res) => {
        console.log("루틴 -> 오늘 운동에 등록");
        setModalData({ type: null, data: null });
        navigate(`/diary/training/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      className={
        "fixed bottom-0 bg-white rounded-2xl border-t border-t-black overflow-auto inset-x-0"
      }
      isOpen={modalData.type === "routineDetail"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="flex flex-col gap-2 m-4">
        {/* 루틴 제목, 편집 창 */}
        <div className="grid grid-cols-5 mb-4">
          <p className="col-start-2 col-end-5 font-semibold text-center">
            {selectedRoutineInfo.title}
          </p>
          <div className="flex flex-row-reverse">
            <Link to="/diary/training/myroutine/edit">
              <p onClick={onClose} className="text-gray-500">
                편집
              </p>
            </Link>
          </div>
        </div>
        {/* 루틴 운동 목록 */}
        <div>
          {selectedRoutine.routine_training_list?.map((data, idx) => {
            return (
              <div key={idx} className="flex flex-col gap-2 my-4">
                <div className="flex">
                  <div>
                    <img src={data.image} alt="img" className="w-16 h-16" />
                  </div>
                  <div className="flex flex-col gap-2 pl-4">
                    <p>
                      <span className="text-lg font-semibold text-teal-700">
                        {idx + 1}
                      </span>{" "}
                      {data.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {data.category} | {data.sets.length}세트 |{" "}
                      {data.sets.reduce((acc, cur) => {
                        return acc + cur.count * cur.kg;
                      }, 0)}
                      kg
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        {/* 하단 버튼 */}
        <form
          onSubmit={postRoutineBySelectedDate}
          className="p-2 bg-teal-700 border rounded-md"
        >
          <button type="submit" className="w-full text-white">
            운동 시작하기
          </button>
        </form>
      </div>
    </Modal>
  );
};

RoutineDetailModal.propTypes = {
  onClose: PropTypes.func,
};

export default RoutineDetailModal;
