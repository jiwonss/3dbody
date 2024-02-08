import { useEffect, useState } from "react";
import BackButton from "../../components/common/BackButton";
import Notice from "../../components/mypage/Notice";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import PageTitle from "../../components/common/PageTitle";

const NoticePage = () => {
  const [noticeList, setnoticeList] = useState(null);
  const baseUrl = useRecoilValue(baseUrlState);

  const getNoticeList = async () => {
    return await axios.get(`${baseUrl}api/notice/posts/list`).then((res) => {
      setnoticeList(
        res.data.map((notice) => {
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
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="공지사항" />
      {noticeList}
    </div>
  );
};

export default NoticePage;
