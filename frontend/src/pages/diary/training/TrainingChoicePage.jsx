import BackButton from "./../../../components/common/BackButton";
import PageTitle from "./../../../components/common/PageTitle";

const TrainingChoicePage = () => {
  return (
    <>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="운동 선택하기" />
    </>
  );
};

export default TrainingChoicePage;
