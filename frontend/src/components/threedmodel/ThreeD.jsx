import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { modelTokenState } from "../../recoil/common/ModelTokenState";
import { userState } from "../../recoil/common/UserState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import {
  ContactShadows,
  Environment,
  // Lightformer,
  OrbitControls,
  // PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { selectedInbodyState, targetInbodyState } from "../../recoil/common/InbodyState";
import { toggleModelState } from "../../recoil/common/ToggleState";
import { useEffect, useRef, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { modalState } from "../../recoil/modal/ModalState";
import { pinNumberState } from "../../recoil/common/PinNumberState";

const ThreeD = () => {
  const [token, setToken] = useRecoilState(modelTokenState);
  const [user, setUser] = useRecoilState(userState);
  const baseUrl = useRecoilValue(baseUrlState);
  const selectedInbody = useRecoilValue(selectedInbodyState);
  const targetInbody = useRecoilValue(targetInbodyState)
  const toggleModel = useRecoilValue(toggleModelState)
  const pinNumber = useRecoilValue(pinNumberState);
  const [modalData, setModalData] = useRecoilState(modalState);
  const [modelName, setModelName] = useState("") // 모델 파일 불러올 이름

  useEffect(() => {
    if (toggleModel === "left") {
      setModelName(`/3D/${selectedInbody.weight}_${selectedInbody.muscle}_.obj`)
    } else {
      setModelName(`/3D/${targetInbody.weight}_${targetInbody.muscle}_.obj`)
    }
  })
  

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
          // zIndex: "-1",
        }}
        // shadows
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        {/* <axesHelper args={[200, 200, 200]} /> */}
        <OrbitControls autoRotate autoRotateSpeed={7} />
        <directionalLight />
        <hemisphereLight color="white" groundColor="brown" intensity={0.75} />
        <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
        <ContactShadows scale={20} position={[0, -2.7, 0]} blur={2} far={100} />
        <primitive scale={3.2} object={model} position={[0, -2.7, 0]} />
      </Canvas>
      <div
        className={
          pinNumber
            ? "hidden"
            : "absolute flex items-center justify-center h-16 bg-white border-2 rounded-full just"
        }
        onClick={onPinNumberHandler}
      >
        <LockClosedIcon className="w-16 h-12" />
      </div>
    </div>
  );
};

export default ThreeD;
