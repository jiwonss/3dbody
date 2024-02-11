import { PropTypes } from "prop-types";
import { useRecoilState } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";

const MyInfo = ({ category, data, modalname }) => {
  const [modalData, setModalData] = useRecoilState(modalState);

  return (
    <>
      <div className="flex justify-between">
        <div>{category}</div>
        <div
          onClick={(event) => {
            setModalData({
              type: modalname,
              data: event.currentTarget.innerText,
            });
            console.log(modalData)
          }}
        >
          {data}
        </div>
      </div>
      <hr />
    </>
  );
};

MyInfo.propTypes = {
  category: PropTypes.string,
  data: PropTypes.any,
  modalname: PropTypes.string,
};

export default MyInfo;
