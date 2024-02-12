import { useRecoilValue } from "recoil";
import { userHistoryState } from "../../../../recoil/diary/UserHistoryState";
import HistoryDetailBox from "./HistoryDetailBox";

const HistoryList = () => {
  const userHistory = useRecoilValue(userHistoryState);

  return (
    <div className="flex flex-col gap-2 pb-4">
      {userHistory.map((data, idx) => {
        return (
          <div key={idx} className="px-4 py-2 bg-gray-200 rounded-lg">
            <HistoryDetailBox data={data} />
          </div>
        );
      })}
    </div>
  );
};

export default HistoryList;
