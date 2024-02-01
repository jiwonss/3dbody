import { useSetRecoilState } from "recoil"
import { modalState } from "./modalState"

const useModal = () => {
  const setModaldata= useSetRecoilState(modalState)
  // 모달 상태 체크하는 훅 
  const openModal = () => {
    setModaldata({isopen:true})
  }
  const closeModal = () =>{
    setModaldata({isopen:false})
  }
  return {openModal, closeModal}
}

export {useModal}
