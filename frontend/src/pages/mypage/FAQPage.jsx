import axios from "axios";
import BackButton from "../../components/common/BackButton";
import FAQ from "./../../components/mypage/FAQ";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";

const FAQPage = () => {
  const [questionList, setQuestionList] = useState(null);
  const baseUrl = useRecoilValue(baseUrlState);

  const getQuestionList = async () => {
    return await axios.get(`${baseUrl}api/faq/posts/list`).then((res) => {
      setQuestionList(
        res.data.map((question) => {
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
      {questionList}
    </div>
  );
};

export default FAQPage;