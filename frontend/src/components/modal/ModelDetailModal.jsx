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

const ModelDetailModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const toggleModel = useRecoilValue(toggleModelState);
  const setSelectedInbody = useSetRecoilState(selectedInbodyState);
  const setTargetInbody = useSetRecoilState(targetInbodyState);
  const setLoading = useSetRecoilState(loadingState);

  const [height, setHeight] = useState(user.info.height);
  const [weight, setWeight] = useState(user.info.weight);
  const [muscle, setMuscle] = useState(0.0); // 골격근량
  const [fatMass, setFatMass] = useState(0.0); // 체지방량
  const [fatPer, setFatPer] = useState(0.0); // 체지방율
  const [tbw, setTbw] = useState(0.0); // 체수분량
  const [bmi, setBmi] = useState(0.0); // BMI
  const [bmr, setBmr] = useState(0.0); // 기초대사량

  const onChangeHeight = (e) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const onChangeWeight = (e) => {
    setWeight(parseInt(e.target.value, 10));
  };

  // 인바디 등록하기
  const postInbody = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${baseUrl}api/inbody/${user.info.userId}`,
      headers: { Authorization: `Bearer ${user.token}` },
      data: {
        height: height,
        weight: weight,
        bmr: bmr,
        muscle: muscle,
        tbw: tbw,
        whr: 0.0,
        bmi: bmi,
        score: 0,
        date: new Date(),
        fat_mass: fatMass,
        fat_per: fatPer,
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
                console.log("인바디 정보 recoil 저장");
                setSelectedInbody(res.data.data_body);
                setModalData({ type: null, data: null });
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
  
  const targetInbody = () => {
    setLoading(true)
    setModalData({ type: null, data: null });
    setTimeout(() => {
      alert("목표 모델을 불러왔습니다.");
      setTargetInbody({ height: height, weight: weight });
      setLoading(false)
    }, 3000);
  };

  return (
    <Modal
      className={"fixed transform -translate-y-1/2 top-1/2 inset-x-8"}
      isOpen={modalData.type === "modelDetail"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="flex flex-col gap-2 p-4 bg-white border-2 border-teal-700 rounded-xl">
        <div className="pt-2 pb-4 text-xl font-semibold text-center text-teal-700 underline underline-offset-4">
          인바디 정보
        </div>
        <ModelDetail name="키" value={height + " cm"} onChange={onChangeHeight} />
        <ModelDetail name="체중" value={weight + " kg"} onChange={onChangeWeight} />
        <ModelDetail name="골격근량" value={muscle + " kg"} onChange={() => {}} />
        <ModelDetail name="체지방량" value={fatMass + " kg"} onChange={() => {}} />
        <ModelDetail name="체지방률" value={fatPer + " %"} onChange={() => {}} />
        <ModelDetail name="체수분" value={tbw + " kg"} onChange={() => {}} />
        <ModelDetail name="BMI" value={String(bmi)} onChange={() => {}} />
        <ModelDetail name="기초대사량" value={bmr + " kcal"} onChange={() => {}} />
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
            onClick={toggleModel === "left" ? postInbody : targetInbody}
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
