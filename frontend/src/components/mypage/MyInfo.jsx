import { PropTypes } from "prop-types";

const MyInfo = ({ category, data }) => {
  return (
    <>
      <div className="flex justify-between">
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
};

export default MyInfo;
