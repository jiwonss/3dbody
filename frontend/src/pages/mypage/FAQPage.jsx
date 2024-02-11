import axios from "axios";
import BackButton from "../../components/common/BackButton";
import FAQ from "./../../components/mypage/FAQ";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import PageTitle from "../../components/common/PageTitle";

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
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="FAQ" />

      <div className="flex flex-col gap-2 m-4">
        {questionList}
      </div>
    </div>
  );
};

export default FAQPage;
