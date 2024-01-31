import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedDateState } from "../../recoil/diary/SelectedDateState";

const CalendarMonth = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState); // 리코일 상태 관리
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2])); // 반환 정보 : Mon Jan 29 2024 ...
  const [calendar, setCalendar] = useState([]);

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
        ? new Array(startDay) // 첫째주 첫째날 이전의 빈칸 채울 리스트 생성 !
            .fill(null) // 우선 null 값 채우고, 지난달 마지막 주 숫자로 변경 !
            .map((_, index) => [
              new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate() -
                startDay +
                index +
                1,
              "prev",
            ])
        : [];
    const currentMonthDays = new Array(endDay).fill(null).map((_, index) => [index + 1, "cur"]);
    const nextMonthDays = new Array(7 - (endOfMonth.getDay() + 1)) // 마지막주 마지막날 이후의 빈칸 채울 리스트 생성
      .fill(null)
      .map((_, index) => [index + 1, "next"]); // 다음달은 1부터 채우면 됨

    setCalendar([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
  };

  const handlePrevMonth = () => {
    // 전월 변경 버튼
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    // 익월 변경 버튼
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date) => {
    // 오늘 날짜 표시용 ( bool )
    const today = new Date();
    return (
      currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() === today.getMonth() &&
      date === today.getDate()
    );
  };

  const onClickDate = (dayInfo) => {
    // 선택 날짜 변경
    if (dayInfo[1] === "cur") {
      setSelectedDate([currentMonth.getFullYear(), currentMonth.getMonth() + 1, dayInfo[0]]);
    } else if (dayInfo[1] === "prev") {
      setSelectedDate([
        currentMonth.getMonth() === 0 ? currentMonth.getFullYear() - 1 : currentMonth.getFullYear(),
        currentMonth.getMonth() === 0 ? 12 : currentMonth.getMonth(),
        dayInfo[0]]);
      handlePrevMonth()
    } else if (dayInfo[1] === "next") {
      setSelectedDate([
        currentMonth.getMonth() === 11 ? currentMonth.getFullYear() + 1 : currentMonth.getFullYear(),
        currentMonth.getMonth() === 11 ? 1 : currentMonth.getMonth() + 2,
        dayInfo[0]]);
      handleNextMonth()
    }
  };

  const isSelectedDate = (dayInfo) => {
    // 선택 날짜 표시용 ( bool )
    return (
      currentMonth.getFullYear() === selectedDate[0] &&
      currentMonth.getMonth() + 1 === selectedDate[1] &&
      dayInfo[0] === selectedDate[2] &&
      dayInfo[1] === "cur"
    );
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
      {/* 요일, 일 표시 ! */}
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
                    onClick={() => onClickDate(dayInfo)}
                    className={`
                      text-center
                      ${dayInfo[1] !== "cur" ? "text-gray-300" : ""}
                      ${isToday(dayInfo[0]) ? "text-green-600" : ""}
                    `}
                  >
                    <div
                      className={`
                        flex justify-center items-center
                        ${isSelectedDate(dayInfo) ? "bg-green-500 rounded-full text-white" : ""}
                        w-8 h-8
                        mx-auto
                      `}
                    >
                      {dayInfo[0]}
                    </div>
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
