import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

// 질문 한개에 대한 컴포넌트
const FAQ = ({ question }) => {
  return (
    <div className="flex justify-center">
      <div className="flex content-center justify-center w-9/12 text-white bg-teal-700 border rounded-xl">
        <Link className="m-2" to={`/mypage/FAQ/${question.postId}`}>
          {question.title}
        </Link>
      </div>
    </div>
  );
};

FAQ.propTypes = {
  question: PropTypes.object,
};

export default FAQ;
