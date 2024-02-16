import { PropTypes } from "prop-types";

const ModelDetail = ({ name, value, onChange, disabled, css }) => {
  return (
    <div className='grid grid-cols-7 gap-2'>
      <div className={`col-span-3 p-1 text-center text-white ${css} rounded-xl`}>
        {name}
      </div>
      <input type="text" value={value} onChange={onChange} disabled={disabled} className={`col-span-4 p-1 text-center border border-teal-700 rounded-xl ${disabled ? "text-gray-500" : ""}`} />
    </div>
  )
};

ModelDetail.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  css: PropTypes.string,
};

export default ModelDetail;