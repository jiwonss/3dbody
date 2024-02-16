import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";

const SelfInputFoodModal = ({ onClose }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const selectedDate = useRecoilValue(selectedDateState);
  const [foodName, setFoodName] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [calorie, setCalorie] = useState("");
  const [carbohydrate, setCarbohydrate] = useState("");
  const [protein, setProtein] = useState("");
  const [lipid, setLipid] = useState("");
  const selectedTime = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]); // 선택한 시간
  const KoreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 GMT 시간보다 9시간 앞서 있다.
  const KoreaNow = new Date(selectedTime.getTime() + KoreaTimeDiff); // 백에서 -9시간 되므로 +9시간 값을 보내준다

  // 직접입력 음식 등록하기
  const onClickPostFood = async () => {
    console.log(foodName);
    console.log(modalData.data);
    console.log(servingSize);
    console.log(calorie);
    console.log(carbohydrate);
    console.log(protein);
    console.log(lipid);
    await axios
      .post(`${baseUrl}api/management/food/add`, {
        name: foodName,
        category: modalData.data,
        servingSize: servingSize,
        calorie: calorie,
        carbohydrate: carbohydrate,
        protein: protein,
        lipid: lipid,
        date: KoreaNow,
      })
      .then((res) => {
        console.log("음식 직접 추가하기 성공");
      })
      .catch((err) => {
        console.log(err);
      });

    setModalData({ type: null, data: null });
  };

  // 직접 입력 정보 ----------------------------------------------------------------------
  const foodNameDiv = () => {
    const onChangeInput = (e) => {
      setFoodName(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex items-center justify-center py-1 text-base text-white bg-teal-700 border rounded-md basis-1/3">
          식품 명
        </div>
        <input
          type="text"
          className="w-full px-2 border-2 border-teal-700 rounded-md"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const servingSizeDiv = () => {
    const onChangeInput = (e) => {
      setServingSize(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex items-center justify-center py-1 text-base text-white bg-teal-700 border rounded-md basis-1/3">
          식품 양
        </div>
        <input
          type="text"
          placeholder="g 단위로 입력해주세요."
          className="w-full px-2 border-2 border-teal-700 rounded-md"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const calorieDiv = () => {
    const onChangeInput = (e) => {
      setCalorie(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex items-center justify-center py-1 text-base text-white bg-teal-700 border rounded-md basis-1/3">
          칼로리
        </div>
        <input
          type="text"
          className="w-full px-2 border-2 border-teal-700 rounded-md"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const carbohydrateDiv = () => {
    const onChangeInput = (e) => {
      setCarbohydrate(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex items-center justify-center py-1 text-base text-white bg-teal-700 border rounded-md basis-1/3">
          탄수화물
        </div>
        <input
          type="text"
          className="w-full px-2 border-2 border-teal-700 rounded-md"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const proteinDiv = () => {
    const onChangeInput = (e) => {
      setProtein(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex items-center justify-center py-1 text-base text-white bg-teal-700 border rounded-md basis-1/3">
          단백질
        </div>
        <input
          type="text"
          className="w-full px-2 border-2 border-teal-700 rounded-md"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const lipidDiv = () => {
    const onChangeInput = (e) => {
      setLipid(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex items-center justify-center py-1 text-base text-white bg-teal-700 border rounded-md basis-1/3">
          지방
        </div>
        <input
          type="text"
          className="w-full px-2 border-2 border-teal-700 rounded-md"
          onChange={onChangeInput}
        />
      </div>
    );
  };
  // 직접 입력 정보 끝 ----------------------------------------------------------------------

  return (
    <Modal
      className={"fixed bottom-0 bg-white rounded-2xl border-t border-t-black overflow-auto inset-x-0"}
      isOpen={modalData.type === "selfInputFood"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="flex flex-col gap-2 m-4">
        <p className="pb-2 font-semibold">음식 직접입력</p>
        {foodNameDiv()}
        {servingSizeDiv()}
        {calorieDiv()}
        {carbohydrateDiv()}
        {proteinDiv()}
        {lipidDiv()}
        <div className="flex gap-2 mt-2">
          <button
            onClick={onClose}
            className="py-1 bg-white border border-teal-700 rounded-md basis-1/2"
          >
            취소
          </button>
          <button
            onClick={() => onClickPostFood()}
            className="py-1 text-white bg-teal-700 border rounded-md basis-1/2"
          >
            추가하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

SelfInputFoodModal.propTypes = {
  onClose: PropTypes.func,
};

export default SelfInputFoodModal;
