import PropTypes from "prop-types";

const Button = ({ btnCss, onClick, buttonName, type }) => {
  return (
    <button className={btnCss} onClick={onClick} type={type}>
      {buttonName}
    </button>
  );
};

Button.propTypes = {
  btnCss: PropTypes.string,
  onClick: PropTypes.func,
  buttonName: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
