import ThreeD from "../../components/threedmodel/ThreeD";
import PageTitle from "../../components/common/PageTitle";
import ToggleTap from "../../components/common/ToggleTap";
import { toggleModelState } from "../../recoil/common/ToggleState";
import Button from "./../../components/common/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";
import {
  inbodyListState,
  selectedInbodyState,
} from "../../recoil/common/InbodyState";
import axios from "axios";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import { useEffect } from "react";
import InBodyNodata from "../../components/threedmodel/InBodyNodata";
import { loadingState } from "../../recoil/common/LoadingState";
import LoadingSpinner from "./../../components/threedmodel/LoadingSpinner";

const HomePage = () => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const [inbodyList, setInbodyList] = useRecoilState(inbodyListState);
  const [selectedInbody, setSelectedInbody] =
    useRecoilState(selectedInbodyState);
  const loading = useRecoilValue(loadingState);
  const toggleModel = useRecoilValue(toggleModelState);

  // 인바디 상세 정보 모달
  const onModelDetailHandler = () => {
    setModalData({ type: "modelDetail", data: "" });
  };

  // 인바디 리스트 불러오기
  const getInbodyList = () => {
    axios({
      method: "get",
      url: `${baseUrl}api/inbody/${user.info.userId}`,
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        setInbodyList(res.data.data_body);

        // 마지막 인바디 id
        const inbodyId =
          res.data.data_body[res.data.data_body.length - 1].inbody_id;
        // 인바디 조회
        axios({
          method: "get",
          url: `${baseUrl}api/inbody/${user.info.userId}/${inbodyId}`,
          headers: { Authorization: `Bearer ${user.token}` },
        })
          .then((res) => {
            setSelectedInbody(res.data.data_body);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (toggleModel === "left") {
      getInbodyList();
    }
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <img src="/fullLogo.png" alt="" className="h-14" />
      </div>
      <hr />
      <ToggleTap
        leftTitle={"현재"}
        rightTitle={"목표"}
        state={toggleModelState}
      />
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          {/* 모델 컴포넌트 */}
          {inbodyList.length ? <ThreeD /> : <InBodyNodata />}
        </>
      )}
      {/* 하단 버튼 */}
      <div className="fixed w-full bg-white bottom-[57px]">
        <div className="p-2 m-4 text-center text-white bg-teal-700 rounded-md">
          <Button
            btnCss="w-full"
            buttonName={
              toggleModel === "left" ? "상세 정보 보기" : "데이터 입력"
            }
            onClick={onModelDetailHandler}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
