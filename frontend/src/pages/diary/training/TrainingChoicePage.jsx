import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import BackButton from "./../../../components/common/BackButton";
import PageTitle from "./../../../components/common/PageTitle";
import Button from "../../../components/common/Button";
import { selectedDateState } from "../../../recoil/diary/SelectedDateState";

const TrainingChoicePage = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const test = false;
  
  return (
    <>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="운동 선택하기" />

      <div className="m-4">
        {test ? (
          <Button buttonName="운동을 선택하세요" disabled />
        ) : (
          <Link to={`/diary/training/${selectedDate[0]}/${selectedDate[1]}/${selectedDate[2]}`}>
            <Button buttonName={"n개의 운동 추가하기"} />
          </Link>
        )}
      </div>
    </>
  );
};

export default TrainingChoicePage;
