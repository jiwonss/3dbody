import ThreeD from "../../components/threedmodel/ThreeD";
import PageTitle from "../../components/common/PageTitle";
import ToggleTap from "../../components/common/ToggleTap";
import { toggleModelState } from "../../recoil/common/ToggleState";

const HomePage = () => {
  return (
    <>
      <PageTitle pageTitle={"쓰리디바디 로고"} />
      <ToggleTap leftTitle={"현재"} rightTitle={"목표"} state={toggleModelState} />
      <ThreeD/>
    </>
  )
};

export default HomePage