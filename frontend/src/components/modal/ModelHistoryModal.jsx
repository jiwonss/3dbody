import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BsFillTrash3Fill } from "react-icons/bs";
import { modalState } from "../../recoil/modal/ModalState";
import { inbodyListState, selectedInbodyState } from "../../recoil/common/InbodyState";
import axios from "axios";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import { useEffect } from 'react';

const ModelHistoryModal = ({ onClose, data }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const [inbodyList, setInbodyList] = useRecoilState(inbodyListState);
  const setSelectedInbody = useSetRecoilState(selectedInbodyState);

  const deleteInbody = (inbody) => {
    axios({
      method: "delete",
      url: `${baseUrl}api/inbody/${user.info.userId}/${inbody.inbody_id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        axios({
          method: "get",
          url: `${baseUrl}api/inbody/${user.info.userId}`,
          headers: { Authorization: `Bearer ${user.token}` },
        }).then((res) => {
          setInbodyList(res.data.data_body);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickInbodyChange = (inbody) => {
    axios({
      method: "get",
      url: `${baseUrl}api/inbody/${user.info.userId}/${inbody.inbody_id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        setSelectedInbody(res.data.data_body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!inbodyList.length) {
      setSelectedInbody([])
    }
  }, [inbodyList])

  return (
    <Modal
      className={
        "fixed transform -translate-y-1/2 top-1/2 inset-x-8 overflow-auto bg-white border-2 border-teal-700 rounded-xl p-4"
      }
      isOpen={modalData.type === "modelHistory"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between pt-2 pb-4 text-center">
          <div className="ml-2 text-2xl font-semibold text-teal-700 underline underline-offset-4">
            인바디 정보
          </div>
          <div className="text-sm font-semibold text-gray-500">
            <button onClick={() => setModalData({ type: "modelDetail", data: null })} className="p-1 border-4 rounded-full">
              돌아가기
            </button>
          </div>
        </div>
        {inbodyList.length ? (
          <div className="flex flex-col gap-2 h-[400px] mb-4">
            {inbodyList.map((data, idx) => {
              return (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between">
                    <p onClick={() => onClickInbodyChange(data)} className="text-lg font-semibold">
                      {data.date.substring(0, 10)}
                    </p>
                    <BsFillTrash3Fill onClick={() => deleteInbody(data)} className="w-5 h-5" />
                  </div>
                  <div className="flex text-sm">
                    <p>키 : {data.height}cm /&nbsp;</p>
                    <p>골격근량 : {data.muscle}kg</p>
                  </div>
                  <div className="flex text-sm">
                    <p>체중 : {data.weight}kg /&nbsp;</p>
                    <p>체지방량 : {data.fat_mass}kg</p>
                  </div>
                  <hr className="mt-2" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2 h-[400px] mb-4 items-center justify-center">
            <p>등록된 인바디 정보가 없습니다.</p>
            <p
              onClick={() => setModalData({ type: "modelDetail", data: null })}
              className="font-semibold text-teal-700"
            >
              등록하러 가기
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

ModelHistoryModal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default ModelHistoryModal;
