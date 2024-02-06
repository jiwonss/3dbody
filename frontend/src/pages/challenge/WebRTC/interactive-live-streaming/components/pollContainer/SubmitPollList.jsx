import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import React, { useMemo, useRef, useState, useEffect } from "react";
import AnswerSubmittedIcon from "../../../icons/Poll/AnswerSubmittedIcon";
import CorrectSelectedIcon from "../../../icons/Poll/CorrectSelectedIcon";
import NoPollActiveIcon from "../../../icons/Poll/NoPollActiveIcon";
import WrongOptionSelectedIcon from "../../../icons/Poll/WrongOptionSelectedIcon";
import { secondsToMinutes } from "./PollList";
import { createPopper } from "@popperjs/core";
import { Input } from "@windmill/react-ui";
import { useMeetingAppContext } from "../../../MeetingAppContextDef";

const SubmitPollListItem = ({ poll }) => {
  const timerIntervalRef = useRef();

  const mMeeting = useMeeting();

  const localParticipantId = useMemo(
    () => mMeeting?.localParticipant?.id,
    [mMeeting]
  );

  const { publish } = usePubSub(`SUBMIT_A_POLL_${poll.id}`);

  const { hasCorrectAnswer, hasTimer, timeout, createdAt, isActive, index } =
    poll;

  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerPollActive, setIsTimerPollActive] = useState(false);

  const isPollActive = useMemo(
    () => (hasTimer ? isTimerPollActive : isActive),
    [hasTimer, isTimerPollActive, isActive]
  );

  const {
    localSubmittedOption,
    totalSubmissions,
    groupedSubmissionCount,
    maxSubmittedOptions,
  } = useMemo(() => {
    const localSubmittedOption = poll.submissions.find(
      ({ participantId }) => participantId === localParticipantId
    );

    const totalSubmissions = poll.submissions.length;

    const groupedSubmissionCount = poll.submissions.reduce(
      (group, { optionId }) => {
        group[optionId] = group[optionId] || 0;

        group[optionId] += 1;

        return group;
      },
      {}
    );

    const maxSubmittedOptions = [];

    const maxSubmittedOptionId = Object.keys(groupedSubmissionCount)
      .map((optionId) => ({
        optionId,
        count: groupedSubmissionCount[optionId],
      }))
      .sort((a, b) => {
        if (a.count > b.count) {
          return -1;
        }
        if (a.count < b.count) {
          return 1;
        }
        return 0;
      })[0]?.optionId;

    Object.keys(groupedSubmissionCount).forEach((optionId) => {
      if (
        groupedSubmissionCount[optionId] ===
        groupedSubmissionCount[maxSubmittedOptionId]
      ) {
        maxSubmittedOptions.push(optionId);
      }
    });

    return {
      localSubmittedOption,
      totalSubmissions,
      groupedSubmissionCount,
      maxSubmittedOptions,
    };
  }, [poll, localParticipantId]);

  const checkTimeOver = ({ timeout, createdAt }) =>
    !(new Date(createdAt).getTime() + timeout * 1000 > new Date().getTime());

  const updateTimer = ({ timeout, createdAt }) => {
    if (checkTimeOver({ timeout, createdAt })) {
      setTimeLeft(0);
      setIsTimerPollActive(false);
      clearInterval(timerIntervalRef.current);
    } else {
      setTimeLeft(
        (new Date(createdAt).getTime() +
          timeout * 1000 -
          new Date().getTime()) /
          1000
      );
      setIsTimerPollActive(true);
    }
  };

  useEffect(() => {
    if (hasTimer) {
      updateTimer({ timeout, createdAt });

      if (!checkTimeOver({ timeout, createdAt })) {
        timerIntervalRef.current = setInterval(() => {
          updateTimer({ timeout, createdAt });
        }, 1000);
      }
    }

    return () => {
      clearInterval(timerIntervalRef.current);
    };
  }, []);

  const TooltipIconRender = ({ Icon, tooltipTitle }) => {
    const [tooltipShow, setTooltipShow] = useState(false);
    const btnRef = useRef();
    const tooltipRef = useRef();

    const openTooltip = () => {
      createPopper(btnRef.current, tooltipRef.current, {
        placement: "right",
      });
      setTooltipShow(true);
    };
    const closeTooltip = () => {
      setTooltipShow(false);
    };
    return (
      <>
        <div
          ref={btnRef}
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
        >
          <div className="ml-2 mr-2 cursor-pointer">
            <Icon />
          </div>
        </div>
        <div
          style={{ zIndex: 999 }}
          className={`${
            tooltipShow ? "" : "hidden"
          } overflow-hidden flex flex-col items-center justify-center pb-1`}
          ref={tooltipRef}
        >
          <div className={"rounded-md p-1.5 bg-black "}>
            <p className="text-base text-white ">{tooltipTitle}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={{ borderBottom: "1px solid #70707033" }}>
      <div className="xl:m-4 m-2 xl:my-[18px] lg:my-4 md:my-[14px] sm:my-3 my-[10px]">
        <div className="flex items-center p-0 m-0">
          <p className="my-0 text-sm font-medium text-gray-900">{`Poll ${index}`}</p>
          <p className="mx-2 my-0 font-medium text-gray-900">&#x2022;</p>
          <p
            className={`mx-2 text-sm ${
              isPollActive ? "text-orange-350" : "text-gray-900"
            }  font-medium my-0`}
          >
            {isPollActive
              ? hasTimer
                ? `Ends in ${secondsToMinutes(timeLeft)}`
                : "Live"
              : "Ended"}
          </p>
        </div>
        <div className="mt-4">
          <p className="text-base font-semibold text-white">{poll.question}</p>
          <div className="mt-4">
            {localSubmittedOption || !isPollActive
              ? poll.options.map((option) => {
                  const total = groupedSubmissionCount[option.optionId];

                  const isOptionSubmittedByLocal =
                    localSubmittedOption?.optionId === option.optionId;

                  const percentage =
                    (total ? total / totalSubmissions : 0) * 100;

                  const isOptionSelectedByLocalIncorrect =
                    localSubmittedOption?.optionId === option.optionId &&
                    !option.isCorrect;

                  const isCorrectOption = option.isCorrect;

                  return (
                    <div className="flex mb-3">
                      <div className="w-full mt-0">
                        <div className="flex items-center">
                          <p className="text-[15px] text-white font-normal">
                            {option.option}
                          </p>

                          {isPollActive ? (
                            isOptionSubmittedByLocal ? (
                              <div className="ml-2">
                                <AnswerSubmittedIcon />
                              </div>
                            ) : null
                          ) : hasCorrectAnswer ? (
                            isCorrectOption ? (
                              <TooltipIconRender
                                Icon={CorrectSelectedIcon}
                                tooltipTitle={"Correct Answer"}
                              />
                            ) : isOptionSelectedByLocalIncorrect ? (
                              <TooltipIconRender
                                Icon={WrongOptionSelectedIcon}
                                tooltipTitle={"Your answer is wrong"}
                              />
                            ) : null
                          ) : null}
                        </div>
                        <div className="flex items-center mt-0">
                          <div className="h-[6px] rounded flex flex-1 bg-gray-700">
                            <div
                              className={`${
                                hasCorrectAnswer && isPollActive
                                  ? "bg-blue-500"
                                  : hasCorrectAnswer && !isPollActive
                                  ? isCorrectOption
                                    ? "bg-purple-550"
                                    : "bg-orange-350"
                                  : maxSubmittedOptions.includes(
                                      option.optionId
                                    )
                                  ? "bg-purple-550"
                                  : "bg-orange-350"
                              } rounded`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="flex items-end justify-end w-10 ml-6">
                            <p className="p-0 m-0 text-white">
                              {`${Math.floor(percentage)}%`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : poll?.options.map((option) => {
                  return (
                    <div className="flex items-center mb-3">
                      <Input
                        type="checkbox"
                        onClick={() => {
                          publish(
                            { optionId: option.optionId },
                            { persist: true }
                          );
                        }}
                        className="w-5 h-5 bg-transparent border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-0"
                      />

                      <div
                        className="w-full ml-3 bg-gray-700 rounded"
                        style={{ padding: "8px 8px 8px" }}
                      >
                        <p className="text-white">{option.option}</p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubmitPollList = ({ panelHeight }) => {
  const { polls } = useMeetingAppContext();
  return (
    <div
      className="overflow-x-hidden overflow-y-auto"
      style={{ height: panelHeight - 14 }}
    >
      <div className="flex flex-col flex-1 h-full">
        {polls?.length > 0 ? (
          polls?.map((poll, index) => {
            return (
              <SubmitPollListItem
                key={`submit_polls_${poll.id}`}
                totalPolls={polls.length}
                poll={poll}
                panelHeight={panelHeight}
                index={index}
              />
            );
          })
        ) : (
          <div
            className="flex flex-col items-center justify-center flex-1"
            style={{ marginTop: "-50px" }}
          >
            <NoPollActiveIcon />
            <p className="text-base font-bold text-white">
              No Poll has been launched yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitPollList;
