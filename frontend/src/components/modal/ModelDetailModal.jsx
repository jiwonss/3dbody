import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";
import ModelDetail from "./ModelDetail";
import { toggleModelState } from "../../recoil/common/ToggleState";
import axios from "axios";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import { selectedInbodyState, targetInbodyState } from "../../recoil/common/InbodyState";
import { loadingState } from "../../recoil/common/LoadingState";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { isValidMuscleState, muscleRoundState } from "../../recoil/common/MuscleRoundState";

const ModelDetailModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const toggleModel = useRecoilValue(toggleModelState);
  const [selectedInbody, setSelectedInbody] = useRecoilState(selectedInbodyState);
  const [targetInbody, setTargetInbody] = useRecoilState(targetInbodyState);
  const setLoading = useSetRecoilState(loadingState);

  const [height, setHeight] = useState(
    selectedInbody?.inbody_id ? selectedInbody.height + " cm" : 0 + " cm"
  );

  const [weight, setWeight] = useState(
    toggleModel === "left"
      ? selectedInbody?.inbody_id
        ? selectedInbody.weight + " kg"
        : 0 + " kg"
      : targetInbody?.weight
      ? targetInbody.weight + " kg"
      : selectedInbody?.inbody_id
      ? selectedInbody.weight + " kg"
      : 0 + " kg"
  );

  const [muscle, setMuscle] = useState(
    toggleModel === "left"
      ? selectedInbody?.inbody_id
        ? selectedInbody.muscle + " kg"
        : 0 + " kg"
      : targetInbody?.muscle
      ? targetInbody.muscle + " kg"
      : selectedInbody?.inbody_id
      ? selectedInbody.muscle + " kg"
      : 0 + " kg"
  ); // 골격근량

  const [fatMass, setFatMass] = useState(
    selectedInbody?.inbody_id ? selectedInbody.fat_mass + " kg" : 0 + " kg"
  ); // 체지방량

  const [fatPer, setFatPer] = useState(
    toggleModel === "left"
      ? selectedInbody?.inbody_id
        ? (selectedInbody.fat_per / selectedInbody.weight) * 100 + " %"
        : 0 + " %"
      : targetInbody?.fat_per
      ? (targetInbody.fat_per / targetInbody.weight) * 100 + " %"
      : selectedInbody?.inbody_id
      ? (selectedInbody.fat_per / selectedInbody.weight) * 100 + " %"
      : 0 + " %"
  ); // 체지방율

  const [tbw, setTbw] = useState(
    selectedInbody?.inbody_id ? selectedInbody.tbw + " kg" : 0 + " kg"
  ); // 체수분량

  const [bmi, setBmi] = useState(selectedInbody?.inbody_id ? selectedInbody.bmi : 0); // BMI

  const [bmr, setBmr] = useState(
    selectedInbody?.inbody_id ? selectedInbody.bmr + " kcal" : 0 + " kcal"
  ); // 기초대사량

  // 인바디 정보 onChangeHandler
  const onChangeHeight = (e) => {
    setHeight(e.target.value);
  };

  const onChangeWeight = (e) => {
    setWeight(e.target.value);
    if (parseFloat(e.target.value, 10)) {
      setFatPer(
        Math.round((parseFloat(fatMass, 10) / parseFloat(e.target.value, 10)) * 100) + " %"
      );
    }
  };

  const onChangeMuscle = (e) => {
    setMuscle(e.target.value);
  };

  const onChangeFatMass = (e) => {
    setFatMass(e.target.value);
    if (parseFloat(e.target.value, 10)) {
      setFatPer(Math.round((parseFloat(e.target.value, 10) / parseFloat(weight, 10)) * 100) + " %");
    }
  };

  const onChangeTbw = (e) => {
    setTbw(e.target.value);
  };

  const onChangeBmi = (e) => {
    setBmi(e.target.value);
  };

  const onChangeBmr = (e) => {
    setBmr(e.target.value);
  };
  // ---------- 인바디 정보 onChangeHandler

  // 인바디 등록하기
  const postInbody = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${baseUrl}api/inbody/${user.info.userId}`,
      headers: { Authorization: `Bearer ${user.token}` },
      data: {
        height: parseFloat(height, 10),
        weight: parseFloat(weight, 10),
        bmr: parseInt(bmr, 10),
        muscle: parseFloat(muscle, 10),
        tbw: parseFloat(tbw, 10),
        whr: 0.0,
        bmi: parseFloat(bmi, 10),
        score: 0,
        date: new Date(),
        fat_mass: parseFloat(fatMass, 10),
        fat_per: parseFloat(fatPer, 10),
      },
    })
      .then((res) => {
        alert("인바디 등록 성공");
        // 인바디 목록 조회
        axios({
          method: "get",
          url: `${baseUrl}api/inbody/${user.info.userId}`,
          headers: { Authorization: `Bearer ${user.token}` },
        })
          .then((res) => {
            // 방금 등록한 인바디 id
            const inbodyId = res.data.data_body[res.data.data_body.length - 1].inbody_id;
            // 인바디 조회
            axios({
              method: "get",
              url: `${baseUrl}api/inbody/${user.info.userId}/${inbodyId}`,
              headers: { Authorization: `Bearer ${user.token}` },
            })
              .then((res) => {
                setSelectedInbody(res.data.data_body);
                setModalData({ type: null, data: null });
                window.location.reload("/");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const muscleRound = useRecoilValue(muscleRoundState); // 골격근량 반올림 파일
  const isValidMuscle = useRecoilValue(isValidMuscleState);

  const getMuscle = (muscle) => {
    return muscleRound[muscle];
  };

  const isValid = (muscle) => {
    return isValidMuscle[muscle];
  };

  const postTargetInbody = () => {
    setLoading(true);

    let wt = Math.round(parseFloat(weight, 10) / 10) * 10;

    if (!isValid(wt)?.includes(getMuscle(parseFloat(muscle, 10)))) {
      alert("정확한 데이터를 입력해 주시길 바랍니다.");
      setLoading(false);
    } else {
      setModalData({ type: null, data: null });
      setTimeout(() => {
        setTargetInbody({
          weight: parseFloat(weight, 10),
          muscle: parseFloat(muscle, 10),
        });
        setLoading(false);
      }, 3000);
    }
  };

  const onModelHistoryHandler = () => {
    setModalData({ type: "modelHistory", data: "" });
  };

  const onClickAlert = () => {
    alert("목표 모델 생성을 위해 체중, 골격근량, 체지방량을 입력해주세요.");
  };

  return (
    <Modal
      className={"fixed transform -translate-y-1/2 top-1/2 inset-x-8"}
      isOpen={modalData.type === "modelDetail"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="flex flex-col gap-2 p-4 bg-white border-2 border-teal-700 rounded-xl">
        <div className="flex justify-between pt-2 pb-4 text-center">
          <div className="ml-2 text-2xl font-semibold text-teal-700 underline underline-offset-4">
            인바디 정보
          </div>
          {toggleModel === "left" ? (
            <div className="text-sm font-semibold text-gray-500">
              <button onClick={onModelHistoryHandler} className="p-1 border-4 rounded-full">
                히스토리
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <ExclamationTriangleIcon
                onClick={onClickAlert}
                className="w-6 h-6 mr-2 text-rose-500"
              />
            </div>
          )}
        </div>
        <ModelDetail
          name="키"
          value={height}
          onChange={onChangeHeight}
          disabled={toggleModel === "right"}
          css={`bg-teal-700`}
        />
        <ModelDetail
          name="체중"
          value={weight}
          onChange={onChangeWeight}
          css={`
            ${toggleModel === "right" ? "bg-red-300" : "bg-teal-700"}
          `}
        />
        <ModelDetail
          name="골격근량"
          value={muscle}
          onChange={onChangeMuscle}
          css={`
            ${toggleModel === "right" ? "bg-red-300" : "bg-teal-700"}
          `}
        />
        <ModelDetail
          name="체지방량"
          value={fatMass}
          onChange={onChangeFatMass}
          css={`
            ${toggleModel === "right" ? "bg-red-300" : "bg-teal-700"}
          `}
        />
        <ModelDetail name="체지방율" value={fatPer} disabled={true} css={`bg-teal-700`} />
        <ModelDetail
          name="체수분"
          value={tbw}
          onChange={onChangeTbw}
          disabled={toggleModel === "right"}
          css={`bg-teal-700`}
        />
        <ModelDetail
          name="BMI"
          value={String(bmi)}
          onChange={onChangeBmi}
          disabled={toggleModel === "right"}
          css={`bg-teal-700`}
        />
        <ModelDetail
          name="기초대사량"
          value={bmr}
          onChange={onChangeBmr}
          disabled={toggleModel === "right"}
          css={`bg-teal-700`}
        />
        <div className="flex gap-2 pt-4 pb-2">
          <input
            type="button"
            value="나가기"
            onClick={onClose}
            className="p-1 text-teal-700 border border-teal-700 rounded-xl"
          />
          <input
            type="button"
            value={toggleModel === "left" ? "등록하기" : "예측하기"}
            onClick={toggleModel === "left" ? postInbody : postTargetInbody}
            className="p-1 text-white bg-teal-700 border rounded-xl"
          />
        </div>
      </div>
    </Modal>
  );
};

ModelDetailModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default ModelDetailModal;
