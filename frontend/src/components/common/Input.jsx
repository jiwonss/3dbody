import PropTypes from "prop-types";

const Input = ({ type, value, placeholder, onChange }) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="px-2 border border-gray-500 rounded-md"
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  placeholder: "입력해 주세요.",
};

export default Input;
