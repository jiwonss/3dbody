import PropTypes from "prop-types";

const Description = ({ Title, size, subTitle, subsize, font }) => {
  return (
    <>
      <p className={`text-${size} font-${font} z-10`}>{Title}</p>
      <p className={`text-${subsize} text-gray-500 z-10`}>{subTitle}</p>
    </>
  )
};

Description.propTypes = {
  Title: PropTypes.string,
  size: PropTypes.string,
  subTitle: PropTypes.string,
  subsize: PropTypes.string,
  font: PropTypes.string,
};

Description.defaultProps = {
  Title: "이전 운동 기록을 선택해주세요.",
  size: "base",
  subTitle: "최근 수행 순",
  subsize: "sm",
  font: "semibold"
};

export default Description;