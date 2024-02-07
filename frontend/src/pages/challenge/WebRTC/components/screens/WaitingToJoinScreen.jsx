import { useEffect, useRef, useState } from "react";
import animationData from "../../../WebRTC/static/animations/join_meeting.json";
import Lottie from "lottie-react";
import useIsTab from "../../hooks/useIsTab";
import useIsMobile from "../../hooks/useIsMobile";

const WaitingToJoinScreen = () => {
  const waitingMessages = [
    { index: 0, text: "방을 만들고 있습니다..." },
    { index: 1, text: "입장 중입니다..." },
  ];
  const [message, setMessage] = useState(waitingMessages[0]);

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMessage((s) =>
        s.index === waitingMessages.length - 1
          ? s
          : waitingMessages[s.index + 1]
      );
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const isTab = useIsTab();
  const isMobile = useIsMobile();

  const animationDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="bg-gray-200"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        // backgroundColor: theme.palette.darkTheme.main,
      }}
    >
      <div className="flex flex-col">
        <div
          style={{
            height: isTab ? 200 : isMobile ? 200 : 250,
            width: isTab ? 200 : isMobile ? 200 : 250,
          }}
        >
          로딩 스피너 넣기
          {/* <Lottie
            loop={animationDefaultOptions.loop}
            autoplay={animationDefaultOptions.autoplay}
            animationData={animationDefaultOptions.animationData}
            rendererSettings={{
              preserveAspectRatio:
                animationDefaultOptions.rendererSettings.preserveAspectRatio,
            }}
            style={{ height: "100%", width: "100%" }}
          /> */}
        </div>
        <h1 className="mt-1 text-xl font-bold text-center text-gray-700">
          {message.text}
        </h1>
      </div>
    </div>
  );
};

export default WaitingToJoinScreen;
