import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContactShadows, OrbitControls, SpotLight } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import {
  selectedInbodyState,
  targetInbodyState,
} from "../../recoil/common/InbodyState";
import { toggleModelState } from "../../recoil/common/ToggleState";
import { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { modalState } from "../../recoil/modal/ModalState";
import { pinNumberState } from "../../recoil/common/PinNumberState";
import { userState } from "../../recoil/common/UserState";
import { muscleRoundState } from "../../recoil/common/MuscleRoundState";

const ThreeD = () => {
  const selectedInbody = useRecoilValue(selectedInbodyState);
  const targetInbody = useRecoilValue(targetInbodyState);
  const toggleModel = useRecoilValue(toggleModelState);
  const pinNumber = useRecoilValue(pinNumberState);
  const setModalData = useSetRecoilState(modalState);
  const user = useRecoilValue(userState);
  const [modelName, setModelName] = useState(""); // 모델 파일 불러올 이름
  const muscleRound = useRecoilValue(muscleRoundState); // 골격근량 반올림 파일
  const getMuscle = (muscle) => {
    return muscleRound[muscle];
  };

  useEffect(() => {
    if (toggleModel === "left") {
      setModelName(
        `/3D/${user.info.gender}_${
          Math.round(selectedInbody.weight / 10) * 10
        }_${getMuscle(selectedInbody.muscle)}_.obj`
      );
    } else {
      if (targetInbody?.weight) {
        setModelName(
          `/3D/${user.info.gender}_${
            Math.round(targetInbody.weight / 10) * 10
          }_${getMuscle(targetInbody.muscle)}_.obj`
        );
      } else {
        setModelName(
          `/3D/${user.info.gender}_${
            Math.round(selectedInbody.weight / 10) * 10
          }_${getMuscle(selectedInbody.muscle)}_.obj`
        );
      }
    }
  }, [selectedInbody, targetInbody, toggleModel]);

  const model = useLoader(OBJLoader, modelName);
  const onPinNumberHandler = () => {
    setModalData({ type: "pinNumber", data: "" });
  };

  return (
    <div className="absolute flex items-center justify-center -z-10">
      <Canvas
        style={{
          width: "100vw",
          height: "75vh",
          backgroundColor: "#E5E7EB",
          filter: pinNumber ? null : "blur(20px)",
        }}
        camera={{ position: [0, 0, 8], fov: 60 }}
      >
        <mesh position={[1, 6, 0]}>
          <SpotLight
            color={"white"}
            castShadow
            penumbra={0.2}
            radiusTop={0.1}
            radiusBottom={40}
            distance={80}
            angle={0.45}
            attenuation={20}
            anglePower={4}
            intensity={1}
            opacity={0.5}
          />
        </mesh>
        <mesh position={[-2, 6, 1]}>
          <SpotLight
            color={"white"}
            castShadow
            penumbra={0.2}
            radiusTop={0.1}
            radiusBottom={40}
            distance={80}
            angle={0.45}
            attenuation={20}
            anglePower={4}
            intensity={1}
            opacity={0.5}
          />
        </mesh>
        <OrbitControls autoRotate autoRotateSpeed={4} />
        <hemisphereLight color="white" groundColor="brown" intensity={0.75} />
        <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
        <ContactShadows scale={20} position={[0, -2.7, 0]} blur={2} far={100} />
        <primitive scale={3} object={model} position={[0, -2.7, 0]} />
      </Canvas>
      <div
        className={
          pinNumber
            ? "hidden"
            : "absolute flex items-center justify-center h-16 bg-white border-2 rounded-full"
        }
        onClick={onPinNumberHandler}
      >
        <LockClosedIcon className="w-16 h-12" />
      </div>
    </div>
  );
};

export default ThreeD;
