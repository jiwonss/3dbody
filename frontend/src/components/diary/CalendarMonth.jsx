import { useState, useEffect } from "react";

const CalendarMonth = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 반환 정보 : Mon Jan 29 2024 ...
  const [calendar, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    generateCalendar();
  }, [currentMonth]);

  const generateCalendar = () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1); // 선택달의 첫째 날 정보
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0); // 선택달의 마지막 날 정보
    const startDay = startOfMonth.getDay(); // 선택달의 첫째날 요일 (0 ~ 6, 일 ~ 토)
    const endDay = endOfMonth.getDate(); // 선택달의 마지막 날짜 (28 ~ 31)

    const prevMonthDays =
      startDay > 0
        ? new Array(startDay) // 첫째주 첫째날 이전의 빈칸 채울 리스트 생성
            .fill(null) // 우선 null 값 채우고, 지난달 마지막 주 숫자로 채우기
            .map((_, index) => [
              new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate() -
                startDay +
                index +
                1,
              false,
            ])
        : [];
    const currentMonthDays = new Array(endDay).fill(null).map((_, index) => [index + 1, true]);
    const nextMonthDays = new Array(7 - (endOfMonth.getDay() + 1))
      .fill(null)
      .map((_, index) => [index + 1, false]);

    setCalendar([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() === today.getMonth() &&
      date === today.getDate()
    );
  };

  const onClickDate = (date) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date));
    console.log(selectedDate);
  };

  return (
    <div className="max-w-screen-sm mx-auto mt-2">
      {/* 연, 월 표시, 방향버튼으로 월 변경 */}
      <div className="flex items-center justify-between px-4">
        <button onClick={handlePrevMonth} className="text-lg">
          &lt;
        </button>
        <span className="font-bold text-gray-800">
          {currentMonth.toLocaleDateString("ko-KR", { year: "numeric", month: "short" })}
        </span>
        <button onClick={handleNextMonth} className="text-lg">
          &gt;
        </button>
      </div>
      {/* 요일, 일 표시 */}
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
          {calendar
            .reduce((rows, dayInfo, index) => {
              if (index % 7 === 0) {
                rows.push([dayInfo]);
              } else {
                rows[rows.length - 1].push(dayInfo);
              }
              return rows;
            }, [])
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((dayInfo, cellIndex) => (
                  <td
                    key={cellIndex}
                    onClick={() => onClickDate(dayInfo[0])}
                    className={`
                    text-center 
                    ${dayInfo[1] === false ? "text-gray-300" : ""}
                    ${isToday(dayInfo[0]) ? "text-green-600" : ""}
                  `}
                  >
                    {dayInfo[0]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarMonth;
