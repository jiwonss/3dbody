import { useNavigate } from "react-router-dom";

export function LeaveScreen({ setIsMeetingLeft }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-screen bg-gray-200">
      <h1 className="text-4xl text-gray-700">감사합니다</h1>
      <div className="mt-12 mb-8">
        <button
          className="`w-full bg-teal-700 text-white px-16 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          다시 참여 하시겠습니까?
        </button>
      </div>
      <button
        className="`w-full bg-teal-600 text-white px-16 py-3 rounded-lg text-sm"
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로
      </button>
    </div>
  );
}
