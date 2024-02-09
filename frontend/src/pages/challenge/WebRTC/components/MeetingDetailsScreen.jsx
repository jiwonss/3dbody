import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { Constants } from "@videosdk.live/react-sdk";
import { useState } from "react";
import { userState } from "../../../../recoil/common/UserState";
import { useRecoilValue } from "recoil";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  videoTrack,
  setVideoTrack,
  onClickStartMeeting,
  setMeetingMode,
  // meetingMode,
}) {
  const [studioCode, setStudioCode] = useState("");
  const [studioCodeError, setStudioCodeError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);
  const user = useRecoilValue(userState);

  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {iscreateMeetingClicked ? (
        <div className="flex flex-col items-center justify-center px-4 py-3 border border-gray-400 border-solid rounded-md">
          <p className="text-black">입장코드</p>
          <div className='flex'>
            <p className="text-base text-black">{`${studioCode}`}</p>
            <button
              className="ml-2"
              onClick={() => {
                navigator.clipboard.writeText(studioCode);
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 3000);
              }}
            >
              {isCopied ? (
                <CheckIcon className="w-5 h-5 text-green-700" />
              ) : (
                <ClipboardIcon className="w-5 h-5 text-black" />
              )}
            </button>
            
          </div>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          <input
            defaultValue={studioCode}
            onChange={(e) => {
              setStudioCode(e.target.value);
            }}
            placeholder="입장 코드번호를 입력해주세요"
            className="w-full px-4 py-3 text-center text-black rounded-md"
          />
          {studioCodeError && (
            <p className="text-xs text-red-600">
              올바른 코드 번호를 입력해 주세요
            </p>
          )}
        </>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="이름을 입력해주세요"
            className="w-full px-4 py-3 mt-5 text-center text-black rounded-md"
          />
          <button
            disabled={participantName.length < 1}
            className={`w-full ${
              participantName.length < 1
                ? "bg-gray-600"
                : "bg-teal-700"
            }  text-white px-2 py-3 rounded-md mt-5`}
            onClick={(e) => {
              if (iscreateMeetingClicked) {
                if (videoTrack) {
                  videoTrack.stop();
                  setVideoTrack(null);
                }
                onClickStartMeeting();
              } else {
                if (studioCode.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  onClickJoin(studioCode);
                } else setStudioCodeError(true);
              }
            }}
          >
            시작하기
          </button>
        </>
      )}

      {!iscreateMeetingClicked &&
      !isJoinMeetingClicked &&
      user.info.role === "ROLE_ADMIN" ? (
        <div className="flex flex-col w-full mt-4 md:mt-0">
          <div className="flex flex-col items-center justify-center w-full">
            <button
              className="w-full px-2 py-3 text-white bg-teal-700 rounded-md"
              onClick={async (e) => {
                const studioCode = await _handleOnCreateMeeting();
                setStudioCode(studioCode);
                setIscreateMeetingClicked(true);
                setMeetingMode(Constants.modes.CONFERENCE);
              }}
            >
              방 만들기
            </button>

            <button
              className="w-full px-2 py-3 mt-5 text-white bg-teal-700 rounded-md"
              onClick={async (e) => {
                setIsJoinMeetingClicked(true);
                setMeetingMode(Constants.modes.CONFERENCE);
              }}
            >
              참여하기
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full mt-4 md:mt-0">
          <div className="flex flex-col items-center justify-center w-full">
            <button
              className="w-full px-2 py-3 mt-5 text-white bg-teal-700 rounded-md"
              onClick={async (e) => {
                setIsJoinMeetingClicked(true);
                setMeetingMode(Constants.modes.CONFERENCE);
              }}
            >
              참여하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
