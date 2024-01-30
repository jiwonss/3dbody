import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";
import { CalendarDaysIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const CalendarWeek = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    generateWeek();
  }, [selectedDate]);

  const generateWeek = () => {
    const startOfWeek = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]);
    startOfWeek.setDate(selectedDate[2] - startOfWeek.getDay()); // 선택날 해당 주의 첫번째 날짜로 조정

    const weekDays = [...Array(7)].map((_, index) => { // 각 인덱스에 Date 객체 저장
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + index);
      return currentDate;
    });

    setCurrentWeek(weekDays);
  };

  const handlePrevWeek = () => { // 전주 변경 버튼
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate[0], prevDate[1] - 1, prevDate[2]);
      newDate.setDate(prevDate[2] - 7);
      return [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];
    });
  };

  const handleNextWeek = () => { // 익주 변경 버튼
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate[0], prevDate[1] - 1, prevDate[2]);
      newDate.setDate(prevDate[2] + 7);
      return [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];
    });
  };
  
  const handleTodayReturn = () => { // 선택날짜 오늘로 변경
    const today = new Date();
    setSelectedDate([today.getFullYear(), today.getMonth() + 1, today.getDate()])
  }
  
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
      <div className="flex">
        <button onClick={handlePrevWeek} className="text-lg">
          &lt;
        </button>
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
                  onClick={() =>
                    setSelectedDate([day.getFullYear(), day.getMonth() + 1, day.getDate()])
                  }
                  className={`
                    text-center 
                    ${day.getMonth() !== selectedDate[1] - 1 ? "text-gray-300" : ""} 
                    `}
                >
                  <div className={`
                    flex justify-center items-center
                    w-8 h-8 mx-auto
                    ${day.getDate() === selectedDate[2] ? "bg-green-500 rounded-full text-white" : ""}
                  `}>
                    {day.getDate()}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <button onClick={handleNextWeek} className="text-lg">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CalendarWeek;
