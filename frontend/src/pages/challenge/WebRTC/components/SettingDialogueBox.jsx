import { Dialog, Popover } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import ConfirmBox from "./ConfirmBox";

const AudioAnalyser = ({ audioTrack }) => {
  const audioTrackRef = useRef();
  const audioAnalyserIntervalRef = useRef();

  const [volume, setVolume] = useState(null);

  const analyseAudio = (audioTrack) => {
    const audioStream = new MediaStream([audioTrack]);
    const audioContext = new AudioContext();

    const audioSource = audioContext.createMediaStreamSource(audioStream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 512;
    analyser.minDecibels = -127;
    analyser.maxDecibels = 0;
    analyser.smoothingTimeConstant = 0.4;

    audioSource.connect(analyser);

    const volumes = new Uint8Array(analyser.frequencyBinCount);
    const volumeCallback = () => {
      analyser.getByteFrequencyData(volumes);

      const volumeSum = volumes.reduce((sum, vol) => sum + vol);
      const averageVolume = volumeSum / volumes.length;

      setVolume(averageVolume);
    };

    audioAnalyserIntervalRef.current = setInterval(volumeCallback, 100);
  };

  const stopAudioAnalyse = () => {
    clearInterval(audioAnalyserIntervalRef.current);
  };

  useEffect(() => {
    audioTrackRef.current = audioTrack;

    if (audioTrack) {
      analyseAudio(audioTrack);
    } else {
      stopAudioAnalyse();
    }
  }, [audioTrack]);

  return (
    <div className="relative w-20 h-[100px]">
      {[
        {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          top: 0,
          alignItems: "flex-end",
        },
        {
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          top: "50%",
          alignItems: "flex-start",
        },
      ].map(
        (
          {
            alignItems,
            top,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            borderTopLeftRadius,
            borderTopRightRadius,
          },
          i
        ) => (
          <div
            key={`audio_analyzer_i_${i}`}
            className={`h-1/2 flex justify-evenly left-0 right-0 absolute`}
            style={{ alignItems, top }}
          >
            {[40, 70, 100, 100, 70, 40].map((height, j) => (
              <div
                key={`audio_analyzer_j_${j}`}
                style={{
                  borderBottomLeftRadius,
                  borderBottomRightRadius,
                  borderTopLeftRadius,
                  borderTopRightRadius,
                  backgroundColor: "#1178F8",
                  width: 80 / 12,
                  height: `${(volume / 256) * height}%`,
                  transition: "all 50ms",
                  transitionTimingFunction: "ease-in",
                }}
              ></div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default function SettingDialogueBox({
  open,
  onClose,
  popupVideoPlayerRef,
  webcams,
  mics,
  setting,
  setSetting,
  setSelectedMic,
  setSelectedWebcam,
  changeWebcam,
  changeMic,
  videoTrack,
  audioTrack,
}) {
  const [selectedMicLabel, setSelectedMicLabel] = useState(null);
  const [selectedWebcamLabel, setSelectedWebcamLabel] = useState(null);

  const [dlgDevices, setDlgDevices] = useState(false);

  const [boxHeight, setBoxHeight] = useState(0);
  const boxRef = useRef();

  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (boxRef.current && boxRef.current.offsetHeight !== boxHeight) {
      setBoxHeight(boxRef.current.offsetHeight);
    }
  }, [windowWidth]);

  const handleSetting = (event, n) => {
    setSetting(n);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-center align-middle transition-all transform bg-gray-800 rounded shadow-xl">
                  <Dialog.Title
                    as="h5"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    세팅
                  </Dialog.Title>
                  <div className="flex flex-1  flex-col overflow-hidden xl:p-[2px] lg:p-[5px] p-[2px]">
                    <div className="flex items-center justify-center">
                      <div className="absolute top-2 right-2 focus-visible:border-none">
                        <button
                          onClick={() => {
                            handleClose();
                          }}
                          className="focus-visible:border-none"
                        >
                          <XMarkIcon className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                      <div className="mt-10">
                        <div>
                          {[
                            { value: "audio", label: "오디오" },
                            { value: "video", label: "비디오" },
                          ].map(({ value, label }, idx) =>
                            label === "오디오" || label === "비디오" ? (
                              <button
                                className={`inline-flex items-center justify-center px-4 py-2 border ${
                                  setting === value
                                    ? "bg-purple-350 border-transparent border-purple-350"
                                    : "border-gray-100"
                                }  text-sm font-medium rounded-sm text-white bg-gray-750`}
                                onClick={() => {
                                  handleSetting(null, value);
                                }}
                                key={idx}
                              >
                                {label}
                              </button>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>

                    {setting === "audio" ? (
                      <div ref={boxRef}>
                        <div className="w-full">
                          <div className="container grid grid-flow-col">
                            <div className="grid grid-cols-12">
                              <div className="col-span-7">
                                <div className="flex flex-col mt-6">
                                  <p className="text-sm font-bold text-left text-white">
                                    마이크
                                  </p>

                                  <div className="w-full mt-4 text-left">
                                    <Popover className="relative">
                                      {({ close }) => (
                                        <>
                                          <Popover.Button className="flex w-full ">
                                            <button className="flex items-center justify-between w-full px-2 py-3 text-white border border-gray-300 rounded">
                                              {selectedMicLabel
                                                ? selectedMicLabel
                                                : "선택"}
                                              <ChevronDownIcon
                                                className="w-4 h-4"
                                                style={{
                                                  color: "white",
                                                }}
                                              />
                                            </button>
                                          </Popover.Button>
                                          <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                          >
                                            <Popover.Panel>
                                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div
                                                  className={"bg-gray-800 py-1"}
                                                >
                                                  <div>
                                                    <div className="flex flex-col">
                                                      {mics.map(
                                                        (item, index) => {
                                                          return (
                                                            item?.kind ===
                                                              "audioinput" && (
                                                              <div
                                                                className={`px-3 py-1 my-1 pl-6 text-white text-left 
                                                            `}
                                                              >
                                                                <button
                                                                  className={`flex flex-1 w-full 
                                                              `}
                                                                  key={`mics_${index}`}
                                                                  value={
                                                                    item?.deviceId
                                                                  }
                                                                  onClick={() => {
                                                                    setSelectedMicLabel(
                                                                      item?.label
                                                                    );
                                                                    setSelectedMic(
                                                                      (s) => ({
                                                                        ...s,
                                                                        id: item?.deviceId,
                                                                      })
                                                                    );
                                                                    changeMic(
                                                                      item?.deviceId
                                                                    );

                                                                    close();
                                                                  }}
                                                                >
                                                                  {item?.label
                                                                    ? item?.label
                                                                    : `Mic ${
                                                                        index +
                                                                        1
                                                                      }`}
                                                                </button>
                                                              </div>
                                                            )
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </Popover.Panel>
                                          </Transition>
                                        </>
                                      )}
                                    </Popover>
                                  </div>
                                </div>
                              </div>

                              <div class="col-span-5">
                                <div className="relative p-4 mt-0 md:mt-10 ">
                                  <div
                                    className="relative flex flex-1 w-1/2 overflow-hidden rounded md:w-full h-1/2 md:h-auto"
                                    style={{ paddingTop: "56.25%" }}
                                  >
                                    <div className="top-0 bottom-0 left-0 right-0 flex flex-col items-start overflow-hidden rounded-sm md:absolute">
                                      <AudioAnalyser audioTrack={audioTrack} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : setting === "video" ? (
                      <div ref={boxRef}>
                        <div className="w-full">
                          <div className="container grid grid-flow-col">
                            <div className="grid grid-cols-12">
                              <div className="col-span-7">
                                <div className="flex flex-col mt-6">
                                  <p className="text-sm font-bold text-left text-white">
                                    카메라
                                  </p>

                                  <div className="w-full mt-4 text-left">
                                    <Popover className="relative">
                                      {({ close }) => (
                                        <>
                                          <Popover.Button className="flex w-full ">
                                            <button className="flex items-center justify-between w-full px-2 py-3 text-white border border-gray-300 rounded">
                                              {selectedWebcamLabel
                                                ? selectedWebcamLabel
                                                : "선택"}
                                              <ChevronDownIcon
                                                className="w-4 h-4"
                                                style={{
                                                  color: "white",
                                                }}
                                              />
                                            </button>
                                          </Popover.Button>
                                          <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                          >
                                            <Popover.Panel>
                                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div
                                                  className={"bg-gray-800 py-1"}
                                                >
                                                  <div>
                                                    <div className="flex flex-col">
                                                      {webcams.map(
                                                        (item, index) => {
                                                          return (
                                                            item?.kind ===
                                                              "videoinput" && (
                                                              <div
                                                                className={`px-3 py-1 my-1 pl-6 text-white text-left 
                                                            `}
                                                              >
                                                                <button
                                                                  className={`flex flex-1 w-full 
                                                              `}
                                                                  key={`webcam_${index}`}
                                                                  value={
                                                                    item?.deviceId
                                                                  }
                                                                  onClick={() => {
                                                                    setSelectedWebcamLabel(
                                                                      item?.label
                                                                    );

                                                                    setSelectedWebcam(
                                                                      (s) => ({
                                                                        ...s,
                                                                        id: item?.deviceId,
                                                                      })
                                                                    );
                                                                    changeWebcam(
                                                                      item?.deviceId
                                                                    );

                                                                    close();
                                                                  }}
                                                                >
                                                                  {item?.label ===
                                                                  ""
                                                                    ? `Webcam ${
                                                                        index +
                                                                        1
                                                                      }`
                                                                    : item?.label}
                                                                </button>
                                                                <hr />
                                                              </div>
                                                            )
                                                          );
                                                        }
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </Popover.Panel>
                                          </Transition>
                                        </>
                                      )}
                                    </Popover>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-5">
                                <div className="relative p-4 mt-0 md:mt-10 ">
                                  <div
                                    className="relative flex flex-1 w-1/2 overflow-hidden rounded md:w-full h-1/2 md:h-auto"
                                    style={{ paddingTop: "56.25%" }}
                                  >
                                    <div className="top-0 bottom-0 left-0 right-0 flex flex-col items-start overflow-hidden rounded-sm md:absolute">
                                      <video
                                        autoPlay
                                        playsInline
                                        muted
                                        ref={popupVideoPlayerRef}
                                        controls={false}
                                        style={{
                                          backgroundColor: "#1c1c1c",
                                        }}
                                        className={
                                          "rounded-md h-full w-full object-cover flip"
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ConfirmBox
        open={dlgDevices}
        title="Mic or webcam not available"
        subTitle="Please connect a mic and webcam to speak and share your video in the meeting. You can also join without them."
        successText="DISMISS"
        onSuccess={() => {
          setDlgDevices(false);
        }}
      />
    </>
  );
}
