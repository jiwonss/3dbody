import { useSetRecoilState } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";

const InBodyNodata = () => {
  const setModalData = useSetRecoilState(modalState);

  // 인바디 상세 정보 모달
  const onModelDetailHandler = () => {
    setModalData({ type: "modelDetail", data: "" });
  };

  return (
    <div className="fixed transform -translate-y-1/2 top-1/2 inset-x-4">
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg">
          아래의{" "}
          <span
            onClick={onModelDetailHandler}
            className="font-semibold text-teal-700"
          >
            상세 정보 보기
          </span>
          를 클릭 후
        </p>
        <p className="text-lg">인바디 정보를 등록해주세요</p>
      </div>
    </div>
  );
};

export default InBodyNodata;
