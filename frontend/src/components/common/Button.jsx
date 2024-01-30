import PropTypes from "prop-types";

const Button = ({ buttonStyle, onClick, buttonName, type }) => {
  let buttonCss = "";

  if (buttonStyle === "small") {
    buttonCss = "btn-sm"; // style에 따라 바꿔지게
  } else if (buttonStyle === "large") {
    buttonCss = "btn-lg"; // style에 따라 바꿔지게
  }

  return (
    <button className={buttonCss} onClick={onClick} type={type}>
      {buttonName}
    </button>
  );
};

Button.propTypes = {
  buttonStyle: PropTypes.string,
  onClick: PropTypes.func,
  buttonName: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
