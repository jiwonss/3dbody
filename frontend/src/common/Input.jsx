import PropTypes from "prop-types";

const Input = ({ type, value, placeholder, onChange, onKeyDown }) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

Input.defaultProps = {
  placeholder: "입력해 주세요.",
};

export default Input;

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
