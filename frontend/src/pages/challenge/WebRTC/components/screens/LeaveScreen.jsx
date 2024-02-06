export function LeaveScreen({ setIsMeetingLeft }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-screen bg-gray-800">
      <h1 className="text-4xl text-white">You left the meeting!</h1>
      <div className="mt-12">
        <button
          className="`w-full bg-purple-350 text-white px-16 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </button>
      </div>
    </div>
  );
}
