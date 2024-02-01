import { useSetRecoilState } from "recoil"
import { modalState } from "./modalState"

const useModal = () => {
  const setModal= useSetRecoilState(modalState)
  // 모달 상태 체크하는 훅 
  const openModal = () => {
    setModal(true)
  }
  const closeModal = () =>{
    setModal(false)
  }
  return {openModal, closeModal}
}

export {useModal}
