import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import PageTitle from "./../../components/common/PageTitle";
import CalendarMonth from "./../../components/diary/CalendarMonth";
import Button from './../../components/common/Button';
import { selectedDateState } from '../../recoil/diary/SelectedDateState';

const DiaryPage = () => {
  const [day, setDay] = useRecoilState(selectedDateState)
  return (
    <div>
      <PageTitle pageTitle={"다이어리"} />
      <CalendarMonth />
      <hr className='my-4' />
      <Link to={`/diary/training/${day[0]}/${day[1] + 1}/${day[2]}`}>
        <Button buttonStyle="large" buttonName="운동 계확하기" />
      </Link>
    </div>
  );
};

export default DiaryPage;
