import Modal from "react-modal";
import axios from "axios";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { modalState } from "../../recoil/modal/ModalState";
import NextButton from "../common/NextButton";
import { selectedRoutineState } from "../../recoil/diary/SelectedRoutineState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { selectedRoutineInfoState } from '../../recoil/diary/SelectedRoutineInfoState';

const RoutineEditMenuModal = ({ onClose }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const [modalData, setModalData] = useRecoilState(modalState);
  const [selectedRoutine, setSelectedRoutine] = useRecoilState(selectedRoutineState);
  const selectedRoutineInfo = useRecoilValue(selectedRoutineInfoState);

  const onClickDelete = () => {
    const RoutineDelete = async () => {
      await axios
        .delete(`${baseUrl}api/management/routine/delete/${selectedRoutineInfo.routineId}`)
        .then((res) => {
          console.log(selectedRoutine.title + " 루틴 삭제 성공");
          setModalData({ type: null, data: null });
          setSelectedRoutine([]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (confirm("해당 루틴을 삭제하시겠습니까?")) {
      RoutineDelete();
    }
  };

  return (
    <Modal
      className={
        "fixed bottom-0 bg-white rounded-md border-t border-t-black overflow-auto inset-x-0"
      }
      isOpen={modalData.type === "routineEditMenu"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="flex flex-col gap-2 m-4">
        <div className="grid grid-cols-3 mb-4">
          <p className="col-start-2 font-semibold text-center">설정</p>
          <div className="flex flex-row-reverse">
            <XMarkIcon className="w-6 h-6" onClick={onClose} />
          </div>
        </div>

        <Link to={`/diary/training/myroutine/edit`}>
          <div className="flex justify-between" onClick={onClose}>
            <div className="flex gap-2">
              <FaRegEdit className="w-5 h-5" />
              <p>편집</p>
            </div>
            <NextButton />
          </div>
        </Link>
        <hr />

        <div className="flex justify-between">
          <div className="flex gap-2">
            <FaRegCopy className="w-5 h-5" />
            <p>복제</p>
          </div>
          <NextButton />
        </div>
        <hr />

        <div className="flex gap-2 text-red-500" onClick={onClickDelete}>
          <BsFillTrash3Fill className="w-5 h-5" />
          <p>삭제</p>
        </div>
      </div>
    </Modal>
  );
};

RoutineEditMenuModal.propTypes = {
  onClose: PropTypes.func,
};

export default RoutineEditMenuModal;
