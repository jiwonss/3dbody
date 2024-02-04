import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

// 질문 한개에 대한 컴포넌트
const FAQ = ({ question }) => {
  console.log(question)
  return (
    <div className="flex justify-center">
      <div className="flex justify-center content-center w-9/12 rounded-full bg-[#2E6F68] text-white border-2">
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
