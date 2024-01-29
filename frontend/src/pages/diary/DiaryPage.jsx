import PageTitle from "./../../components/common/PageTitle";
import CalendarMonth from "./../../components/diary/CalendarMonth";

const DiaryPage = () => {
  return (
    <div>
      <PageTitle pageTitle={"다이어리"} />
      <CalendarMonth />
    </div>
  );
};

export default DiaryPage;
