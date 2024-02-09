import { atom } from "recoil";

const selectedHistoryListState = atom({ // 선택한 운동 기록 목록
  key: "selectedHistoryListState",
  default: [],
});

export { selectedHistoryListState };
