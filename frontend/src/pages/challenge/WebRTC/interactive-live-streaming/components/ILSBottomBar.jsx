import {
  Constants,
  createCameraVideoTrack,
  useMeeting,
  usePubSub,
} from "@videosdk.live/react-sdk";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  ClipboardIcon,
  CheckIcon,
  // ChevronDownIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
// import recordingBlink from "../../static/animations/recording-blink.json";
// import liveHLS from "../../static/animations/live-hls.json";
// import useIsRecording from "../../hooks/useIsRecording";
// import RecordingIcon from "../../icons/Bottombar/RecordingIcon";
import MicOnIcon from "../../icons/Bottombar/MicOnIcon";
import MicOffIcon from "../../icons/Bottombar/MicOffIcon";
import WebcamOnIcon from "../../icons/Bottombar/WebcamOnIcon";
import WebcamOffIcon from "../../icons/Bottombar/WebcamOffIcon";
// import ScreenShareIcon from "../../icons/Bottombar/ScreenShareIcon";
import ChatIcon from "../../icons/Bottombar/ChatIcon";
import ParticipantsIcon from "../../icons/Bottombar/ParticipantsIcon";
import EndIcon from "../../icons/Bottombar/EndIcon";
import RaiseHandIcon from "../../icons/Bottombar/RaiseHandIcon";
import { OutlinedButton } from "../../components/buttons/OutlinedButton";
import { createPopper } from "@popperjs/core";
import useIsTab from "../../hooks/useIsTab";
import useIsMobile from "../../hooks/useIsMobile";
import { MobileIconButton } from "../../components/buttons/MobileIconButton";
// import PollIcon from "../../icons/Bottombar/PollIcon";
// import useIsHls from "../../hooks/useIsHls";
// import LiveIcon from "../../icons/LiveIcon";
// import ReactionIcon from "../../icons/Bottombar/ReactionIcon";
import { sideBarModes } from "../../utils/common";
// import ECommerceIcon from "../../icons/Bottombar/ECommerceIcon";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { useMeetingAppContext } from "../../MeetingAppContextDef";

export function ILSBottomBar({
  bottomBarHeight,
  setIsMeetingLeft,
  selectWebcamDeviceId,
  setSelectWebcamDeviceId,
  selectMicDeviceId,
  setSelectMicDeviceId,
  meetingMode,
}) {
  const { sideBarMode, setSideBarMode } = useMeetingAppContext();
  const RaiseHandBTN = ({ isMobile, isTab }) => {
    const { publish } = usePubSub("RAISE_HAND");
    const RaiseHand = () => {
      publish("Raise Hand");
    };

    return isMobile || isTab ? (
      <MobileIconButton
        id="RaiseHandBTN"
        tooltipTitle={"Raise hand"}
        Icon={RaiseHandIcon}
        onClick={RaiseHand}
        buttonText={"손들기"}
      />
    ) : (
      <OutlinedButton
        onClick={RaiseHand}
        tooltip={"Raise Hand"}
        Icon={RaiseHandIcon}
      />
    );
  };

  const MicBTN = () => {
    const mMeeting = useMeeting();
    const localMicOn = mMeeting?.localMicOn;

    return (
      <>
        <OutlinedButton
          Icon={localMicOn ? MicOnIcon : MicOffIcon}
          onClick={() => {
            mMeeting.toggleMic();
          }}
          bgColor={localMicOn ? "bg-gray-800" : "bg-white"}
          borderColor={localMicOn && "#ffffff33"}
          isFocused={localMicOn}
          focusIconColor={localMicOn && "white"}
        />
      </>
    );
  };

  const WebCamBTN = () => {
    const mMeeting = useMeeting();
    const localWebcamOn = mMeeting?.localWebcamOn;

    return (
      <>
        <OutlinedButton
          Icon={localWebcamOn ? WebcamOnIcon : WebcamOffIcon}
          onClick={async () => {
            let track;
            if (!localWebcamOn) {
              track = await createCameraVideoTrack({
                optimizationMode: "motion",
                encoderConfig: "h540p_w960p",
                facingMode: "environment",
                multiStream: false,
                cameraId: selectWebcamDeviceId,
              });
            }
            mMeeting.toggleWebcam(track);
          }}
          bgColor={localWebcamOn ? "bg-gray-800" : "bg-white"}
          borderColor={localWebcamOn && "#ffffff33"}
          isFocused={localWebcamOn}
          focusIconColor={localWebcamOn && "white"}
        />
      </>
    );
  };

  const LeaveBTN = () => {
    const { leave } = useMeeting();

    return (
      <OutlinedButton
        Icon={EndIcon}
        bgColor="bg-red-600"
        onClick={() => {
          if (confirm("종료하시겠습니까?")) {
            leave();
            setIsMeetingLeft(true);
          }
        }}
      />
    );
  };

  const ChatBTN = ({ isMobile, isTab }) => {
    return isMobile || isTab ? (
      <MobileIconButton
        tooltipTitle={"Chat"}
        buttonText={"채팅"}
        Icon={ChatIcon}
        isFocused={sideBarMode === sideBarModes.CHAT}
        onClick={() => {
          setSideBarMode((s) =>
            s === sideBarModes.CHAT ? null : sideBarModes.CHAT
          );
        }}
      />
    ) : (
      <OutlinedButton
        Icon={ChatIcon}
        onClick={() => {
          setSideBarMode((s) =>
            s === sideBarModes.CHAT ? null : sideBarModes.CHAT
          );
        }}
        isFocused={sideBarMode === "CHAT"}
        tooltip="View Chat"
      />
    );
  };

  const ParticipantsBTN = ({ isMobile, isTab }) => {
    const { participants } = useMeeting();
    return isMobile || isTab ? (
      <MobileIconButton
        tooltipTitle={"Participants"}
        isFocused={sideBarMode === sideBarModes.PARTICIPANTS}
        buttonText={"참가자"}
        disabledOpacity={1}
        Icon={ParticipantsIcon}
        onClick={() => {
          setSideBarMode((s) =>
            s === sideBarModes.PARTICIPANTS ? null : sideBarModes.PARTICIPANTS
          );
        }}
        badge={`${new Map(participants)?.size}`}
        disabled={meetingMode === Constants.modes.VIEWER}
      />
    ) : (
      <OutlinedButton
        Icon={ParticipantsIcon}
        onClick={() => {
          setSideBarMode((s) =>
            s === sideBarModes.PARTICIPANTS ? null : sideBarModes.PARTICIPANTS
          );
        }}
        isFocused={sideBarMode === sideBarModes.PARTICIPANTS}
        tooltip={"View \nParticipants"}
        badge={`${new Map(participants)?.size}`}
        disabled={meetingMode === Constants.modes.VIEWER}
      />
    );
  };

  const MeetingIdCopyBTN = () => {
    const { meetingId } = useMeeting();
    const [isCopied, setIsCopied] = useState(false);
    return (
      <div className="flex items-center justify-center mt-0 ml-0 lg:ml-0 xl:mt-0">
        <div className="flex items-center justify-center p-2 border-2 rounded-md">
          <h1 className="text-base text-white ">{`입장 코드 : ${meetingId}`}</h1>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(meetingId);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="w-5 h-5 text-green-400" />
            ) : (
              <ClipboardIcon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    );
  };

  const isMobile = useIsMobile();
  const isTab = useIsTab();

  const [open, setOpen] = useState(false);

  const handleClickFAB = () => {
    setOpen(true);
  };

  const handleCloseFAB = () => {
    setOpen(false);
  };

  const BottomBarButtonTypes = useMemo(
    () => ({
      END_CALL: "END_CALL",
      CHAT: "CHAT",
      PARTICIPANTS: "PARTICIPANTS",
      WEBCAM: "WEBCAM",
      MIC: "MIC",
      RAISE_HAND: "RAISE_HAND",
      MEETING_ID_COPY: "MEETING_ID_COPY",
    }),
    []
  );

  const otherFeatures = [
    { icon: BottomBarButtonTypes.RAISE_HAND },
    { icon: BottomBarButtonTypes.CHAT },
    { icon: BottomBarButtonTypes.PARTICIPANTS },
    { icon: BottomBarButtonTypes.MEETING_ID_COPY },
  ];

  return isMobile || isTab ? (
    <div
      className="flex items-center justify-center"
      style={{ height: bottomBarHeight }}
    >
      <LeaveBTN />
      {meetingMode === Constants.modes.CONFERENCE && (
        <>
          <MicBTN />
          <WebCamBTN />
        </>
      )}
      <OutlinedButton Icon={EllipsisHorizontalIcon} onClick={handleClickFAB} />

      <Transition appear show={Boolean(open)} as={Fragment}>
        <Dialog
          as="div"
          className="relative"
          style={{ zIndex: 9999 }}
          onClose={handleCloseFAB}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-full opacity-0 scale-95"
            enterTo="translate-y-0 opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100 scale-100"
            leaveTo="translate-y-full opacity-0 scale-95"
          >
            <div className="fixed inset-0 overflow-y-hidden">
              <div className="flex items-end justify-end h-full text-center">
                <Dialog.Panel className="w-screen overflow-hidden transition-all transform bg-gray-800 shadow-xl">
                  <div className="container grid py-6 bg-gray-800">
                    <div className="grid grid-cols-12 gap-2">
                      {otherFeatures.map(({ icon }, idx) => {
                        return (
                          <div
                            className={`grid items-center justify-center ${
                              icon === BottomBarButtonTypes.MEETING_ID_COPY
                                ? "col-start-2 col-end-12 col-span-7 sm:col-span-5 md:col-span-3"
                                : "col-span-4 sm:col-span-3 md:col-span-2"
                            }`}
                            key={idx}
                          >
                            {icon === BottomBarButtonTypes.RAISE_HAND ? (
                              <RaiseHandBTN isMobile={isMobile} isTab={isTab} />
                            ) : icon === BottomBarButtonTypes.CHAT ? (
                              <ChatBTN isMobile={isMobile} isTab={isTab} />
                            ) : icon === BottomBarButtonTypes.PARTICIPANTS ? (
                              <ParticipantsBTN
                                isMobile={isMobile}
                                isTab={isTab}
                              />
                            ) : icon ===
                              BottomBarButtonTypes.MEETING_ID_COPY ? (
                              <MeetingIdCopyBTN
                                isMobile={isMobile}
                                isTab={isTab}
                              />
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  ) : null;
}
