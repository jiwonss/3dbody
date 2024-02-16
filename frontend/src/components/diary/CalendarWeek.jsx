import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { selectedDateState, selectedDayState } from "../../recoil/diary/SelectedDateState";

const CalendarWeek = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [currentWeek, setCurrentWeek] = useState([]);
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const setSelectedDay = useSetRecoilState(selectedDayState);
  const navigate = useNavigate();

  useEffect(() => {
    generateWeek();
    // 선택 날짜 요일 정보 저장 ("일", "월", "화", "수", "목", "금", "토")
    const selectedDayInfo = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]);
    setSelectedDay(daysOfWeek[selectedDayInfo.getDay()]);
  }, [selectedDate]);

  const generateWeek = () => { // 주간 달력 초기화
    const startOfWeek = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]);
    startOfWeek.setDate(selectedDate[2] - startOfWeek.getDay()); // 선택날 해당 주의 첫번째 날짜로 조정

    const weekDays = [...Array(7)].map((_, index) => {
      // 각 인덱스에 Date 객체 저장
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + index);
      return currentDate;
    });

    setCurrentWeek(weekDays);
  };

  const handlePrevWeek = () => {
    // 전주 변경 버튼
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate[0], prevDate[1] - 1, prevDate[2]);
      newDate.setDate(prevDate[2] - 7);
      updateUrl(newDate);
      return [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];
    });
  };

  const handleNextWeek = () => {
    // 익주 변경 버튼
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate[0], prevDate[1] - 1, prevDate[2]);
      newDate.setDate(prevDate[2] + 7);
      updateUrl(newDate);
      return [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];
    });
  };

  const handleTodayReturn = () => {
    // 선택날짜 오늘로 변경
    const today = new Date();
    updateUrl(today);
    setSelectedDate([today.getFullYear(), today.getMonth() + 1, today.getDate()]);
  };

  const updateUrl = (day) => { // 선택날짜로 url 업데이트
    const year = day.getFullYear();
    const month = day.getMonth() + 1;
    const date = day.getDate();
    navigate(
      window.location.href.includes("training")
        ? `/diary/training/${year}/${month}/${date}`
        : `/diary/food/${year}/${month}/${date}`
    );
  };

  return (
    <div className="max-w-screen-sm mx-auto mt-2">
      <div className="flex items-center justify-between px-4">
        <Link to="/diary">
          <CalendarDaysIcon className="w-6 h-6" />
        </Link>
        <span className="mx-auto font-bold text-gray-800">
          {selectedDate[1]}월 {selectedDate[2]}일
        </span>
        <ArrowPathIcon className="w-6 h-6" onClick={handleTodayReturn} />
      </div>
      <div className="flex items-center justify-center mx-4">
        <ChevronLeftIcon className="w-6 h-6 " onClick={handlePrevWeek} />
        <table className="w-full mx-auto">
          <thead>
            <tr>
              <th className="py-2 text-center text-red-500">일</th>
              <th className="py-2 text-center">월</th>
              <th className="py-2 text-center">화</th>
              <th className="py-2 text-center">수</th>
              <th className="py-2 text-center">목</th>
              <th className="py-2 text-center">금</th>
              <th className="py-2 text-center text-blue-500">토</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {currentWeek.map((day, index) => (
                <td
                  key={index}
                  onClick={() => {
                    updateUrl(day);
                    setSelectedDate([day.getFullYear(), day.getMonth() + 1, day.getDate()]);
                  }}
                  className={`
                    text-center 
                    ${day.getMonth() !== selectedDate[1] - 1 ? "text-gray-300" : ""} 
                    `}
                >
                  <div
                    className={`
                    flex justify-center items-center
                    w-8 h-8 mx-auto
                    ${
                      day.getDate() === selectedDate[2]
                        ? "bg-teal-700 rounded-full text-white"
                        : ""
                    }
                  `}
                  >
                    {day.getDate()}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <ChevronRightIcon className="w-6 h-6" onClick={handleNextWeek} />
      </div>
    </div>
  );
};

export default CalendarWeek;
