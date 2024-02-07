import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  ChevronUpDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Description from "../Description";

const HistoryDetailBox = ({ data }) => {
  // 요일 계산
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfHistory = new Date(data.date);
  const dayOfWeek = daysOfWeek[dayOfHistory.getDay()];

  // 해당 날짜에 포함된 운동 카테고리
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoryMap = data.user_training_list.map(data => data.category);
    setCategories([...new Set(categoryMap)]);
  }, []);

  return (
    <div className="flex justify-between">
      <div>
        <Description
          Title={`${dayOfHistory.getMonth()}월 ${dayOfHistory.getDate()}일 (${dayOfWeek})`}
          subTitle={categories.join(" ")}
        />
      </div>
      <ChevronDownIcon className="w-6 h-6 my-auto" />
    </div>
  );
};

HistoryDetailBox.propTypes = {
  data: PropTypes.object,
};

export default HistoryDetailBox;
