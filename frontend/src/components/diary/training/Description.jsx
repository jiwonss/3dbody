import PropTypes from "prop-types";

const Description = ({ Title, size, subTitle, subsize }) => {
  return (
    <>
      <p className={`text-${size} font-semibold`}>{Title}</p>
      <p className={`text-${subsize} font-light`}>{subTitle}</p>
    </>
  )
};

Description.propTypes = {
  Title: PropTypes.string,
  size: PropTypes.string,
  subTitle: PropTypes.string,
  subsize: PropTypes.string,
};

Description.defaultProps = {
  Title: "이전 운동 기록을 선택해주세요.",
  size: "sm",
  subTitle: "최근 수행 순",
  subsize: "xs",
};

export default Description;