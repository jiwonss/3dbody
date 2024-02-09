import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ChevronUpDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Description from "../Description";
import { selectedHistoryListState } from "../../../../recoil/diary/SelectedHistoryListState";

const HistoryDetailBox = ({ data }) => {
  const [toggle, setToggle] = useState(false);
  const [selectedHistoryList, setSelectedHistoryList] = useRecoilState(selectedHistoryListState);

  // 요일 계산
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfHistory = new Date(data.date);
  const dayOfWeek = daysOfWeek[dayOfHistory.getDay()];

  // 해당 날짜에 포함된 운동 카테고리
  const [categories, setCategories] = useState([]);

  // 체크박스로 운동 저장
  const handleCheckboxChange = (selectedHistory) => {
    if (selectedHistoryList.includes(selectedHistory)) {
      setSelectedHistoryList(selectedHistoryList.filter((history) => history !== selectedHistory));
    } else {
      setSelectedHistoryList([...selectedHistoryList, selectedHistory]);
    }
  };

  useEffect(() => {
    // 헤당날짜 운동 카테고리 목록만 추출
    const categoryMap = data.user_training_list.map((data) => data.category);
    setCategories([...new Set(categoryMap)]);
  }, []);

  return (
    <>
      <div className="flex justify-between" onClick={() => setToggle(!toggle)}>
        <div>
          <Description
            Title={`${dayOfHistory.getMonth()}월 ${dayOfHistory.getDate()}일 (${dayOfWeek})`}
            subTitle={categories.join(" ")}
          />
        </div>
        <ChevronDownIcon className="w-6 h-6 my-auto" />
      </div>
      {/* toggle - 운동 목록 */}
      <div className={`${toggle ? "" : "hidden"} flex flex-col gap-2 pt-2`}>
        {data.user_training_list.map((data, idx) => {
          return (
            <div key={idx} className="gap-2">
              <hr className="pb-2" />
              <div className="flex">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(data)}
                  checked={selectedHistoryList.includes(data)}
                  className="w-5 h-5 mt-1 mr-2 accent-teal-600"
                />
                <div className="flex flex-col">
                  <p>
                    <span className="ps-1 pe-2">{data.category}</span>|
                    <span className="px-2">{data.name}</span>
                  </p>
                  {data.sets.map((set, idx) => {
                    return (
                      <div key={idx} className="flex gap-2 text-sm text-gray-500 ps-1">
                        <p>{idx + 1}세트</p>
                        <p>{set.kg}kg</p>
                        <p>{set.count}회</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

HistoryDetailBox.propTypes = {
  data: PropTypes.object,
};

export default HistoryDetailBox;
