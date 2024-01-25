const Button = (props) => {
  let buttonCss = "";

  if (props.style === "small") {
    buttonCss = "btn-sm"; // style에 따라 바꿔지게
  } else if (props.style === "large") {
    buttonCss = "btn-lg"; // style에 따라 바꿔지게
  }

  return (
    <button className={buttonCss} onClick={props.onClick}>
      {props.buttonName}
    </button>
  );
};

export default Button;
