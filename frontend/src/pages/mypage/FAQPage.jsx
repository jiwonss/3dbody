import axios from "axios";
import BackButton from "../../components/common/BackButton";
import FAQ from "./../../components/mypage/FAQ";
import { useEffect, useState } from "react";

const FAQPage = () => {
  const [questions, setQuestionList] = useState(null);

  const getQuestionList = async () => {
    return await axios
      .get("http://i10c204.p.ssafy.io:8082/api/notice/posts/1")
      .then((response) => {
        const res = [];
        res.push(response.data);
        console.log(res);
        setQuestionList(
          res.map((question) => {
            return <FAQ key={question.postId} question={question} />;
          })
        );
      });
  };

  useEffect(() => {
    getQuestionList();
  }, []);

  return (
    <div>
      <BackButton />
      {questions}
    </div>
  );
};

export default FAQPage;
