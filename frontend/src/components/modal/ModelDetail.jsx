import { PropTypes } from "prop-types";

const ModelDetail = ({ name, value, onChange }) => {
  return (
    <div className='grid grid-cols-7 gap-2'>
      <div className='col-span-3 p-1 text-center text-white bg-teal-700 rounded-xl'>
        {name}
      </div>
      <input type="text" value={value} onChange={onChange} className='col-span-4 p-1 text-center border border-teal-700 rounded-xl'/>
    </div>
  )
};

ModelDetail.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default ModelDetail;