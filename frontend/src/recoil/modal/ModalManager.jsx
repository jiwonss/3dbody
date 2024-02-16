import { useRecoilState } from "recoil";
import { modalState } from "./ModalState";
import ChangeNicknameModal from "../../components/modal/ChangeNicknameModal";
import ChangeGenderModal from "../../components/modal/ChangeGenderModal";
import SelfInputFoodModal from "../../components/modal/SelfInputFoodModal";
import SignUpModal from "../../components/modal/SignUpModal";
import RoutineCreateModal from "../../components/modal/RoutineCreateModal";
import RoutineEditMenuModal from "../../components/modal/RoutineEditMenuModal";
import ChallengeMenuModal from "../../components/modal/ChallengeMenuModal";
import ChangeHeightModal from "../../components/modal/ChangeHeightModal";
import ChangeWeightModal from "../../components/modal/ChangeWeightModal";
import RoutineDetailModal from "../../components/modal/RoutineDetailModal";
import ModelDetailModal from '../../components/modal/ModelDetailModal';
import PinNumberModal from '../../components/modal/PinNumberModal';
import ModelHistoryModal from '../../components/modal/ModelHistoryModal';

const ModalManager = () => {
  const [modalData, setModalData] = useRecoilState(modalState);

  const closeModal = () => {
    setModalData({ type: null, data: null });
  };
  // 화면에 띄울 모달 설정 recoil에 이름으로 저장 해서 해당 이름에 맞는 작성한 모달 컴포넌트 호출!
  switch (modalData.type) {
    case "signup":
      return <SignUpModal onClose={closeModal} />;
    case "changeNickname":
      return <ChangeNicknameModal onClose={closeModal} data={modalData.data} />;
    case "changeGender":
      return <ChangeGenderModal onClose={closeModal} data={modalData.data} />;
    case "changeHeight":
      return <ChangeHeightModal onClose={closeModal} data={modalData.data} />;
    case "changeWeight":
      return <ChangeWeightModal onClose={closeModal} data={modalData.data} />;
    case "selfInputFood":
      return <SelfInputFoodModal onClose={closeModal} data={modalData.data} />;
    case "routineCreate":
      return <RoutineCreateModal onClose={closeModal} data={modalData.data} />;
    case "routineEditMenu":
      return (
        <RoutineEditMenuModal onClose={closeModal} data={modalData.data} />
      );
    case "challengeMenu":
      return <ChallengeMenuModal onClose={closeModal} data={modalData.data} />;
    case "routineDetail":
      return <RoutineDetailModal onClose={closeModal} data={modalData.data} />;
    case "modelDetail":
      return <ModelDetailModal onClose={closeModal} data={modalData.data} />;
    case "pinNumber":
      return <PinNumberModal onClose={closeModal} data={modalData.data} />
    case "modelHistory":
      return <ModelHistoryModal onClose={closeModal} data={modalData.data} />;
    default:
      return <></>;
  }
};

export default ModalManager;
