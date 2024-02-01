import { PropTypes } from "prop-types";
import { useSetRecoilState } from "recoil";
import { modalState } from "../../recoil/modal/modalState";

const MyInfo = ({ category, data, modalname }) => {
  const setModalName = useSetRecoilState(modalState);

  return (
    <>
      <div
        onClick={() => setModalName(modalname)}
        className="flex justify-between"
      >
        <div>{category}</div>
        <div>{data}</div>
      </div>
      <hr />
    </>
  );
};

MyInfo.propTypes = {
  category: PropTypes.string,
  data: PropTypes.string,
  modalname: PropTypes.string,
};

export default MyInfo;
