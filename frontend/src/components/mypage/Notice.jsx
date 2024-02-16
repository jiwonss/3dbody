import { PropTypes } from "prop-types";

// 한 개의 공지에 대한 컴포넌트
const Notice = ({ notice }) => {
  const createdAt  = notice.createdAt.substring(0, 10)
  return (
    <div className="flex p-2 text-white bg-teal-700 border rounded-xl">
      <p className='basis-1/3'>{ createdAt }</p>
      <p className='basis-2/3'>{ notice.title }</p>
    </div>
  );
};

Notice.propTypes = {
  notice: PropTypes.object,
};

export default Notice;
