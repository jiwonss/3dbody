import { useEffect, useState } from "react";
import BackButton from "../../components/common/BackButton"
import Notice from "../../components/mypage/Notice"
import axios from "axios";

const NoticePage = () => {
  const [noticeList, setnoticeList] = useState(null);

  const getNoticeList = async () => {
    return await axios
      .get("http://i10c204.p.ssafy.io:8082/api/notice/posts/1")
      .then((response) => {
        const res = [];
        res.push(response.data);
        console.log(res);
        setnoticeList(
          res.map((notice) => {
            return <Notice key={notice.postId} notice={notice} />;
          })
        );
      });
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  return (
      <div>
        <BackButton/>
        {noticeList}
      </div>
  ) 
}

export default NoticePage