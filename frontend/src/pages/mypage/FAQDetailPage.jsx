import axios from "axios";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import BackButton from "./../../components/common/BackButton";
import { useParams } from "react-router-dom";
import { useState } from "react";

const FAQDetailPage = () => {
  const { postId } = useParams();
  const baseUrl = useRecoilValue(baseUrlState);
  const [FAQ, setFAQ] = useState()
  const getFAQ = () => {
    axios({
      method: "get",
      url: `${baseUrl}api/faq/posts/${postId}`,
    }).then((res) => {
      console.log(res);
      setFAQ(res)
    });
  };
  useEffect(() => {
    getFAQ();
  }, []);
  return (
    <div>
      <BackButton />
      <div>{FAQ}</div>
    </div>
  );
};

export default FAQDetailPage;
