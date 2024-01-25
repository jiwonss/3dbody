import PropTypes from "prop-types";

const InputComponent = (props) => {
  return (
    <div>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
};

InputComponent.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

InputComponent.defaultProps = {
  placeholder: "입력해 주세요.",
};

export default InputComponent;


// import { useState } from "react";
// import InputComponent from "./common/Input";

// function App() {
//   const [value, setValue] = useState("");

//   const handleSearch = () => {
//     console.log("검색어:", value);
//   };

//   const onChangeInput = (e) => {
//     setValue(e.target.value);
//   };

//   const onHandleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <>
//       <div>{value}</div>
//       <InputComponent type="text" value={value} onChange={onChangeInput} onKeyDown={onHandleKeyDown} />
//     </>
//   );
// }
