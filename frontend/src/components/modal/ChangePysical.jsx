import { useForm } from "react-hook-form";


const ChangepPysical = ({title, onClose, data}) => {
  const { register, handleSubmit, getValues} = useForm()
 
  return (
    <div>
      <Modal
      className={"fixed bottom-0 w-full bg-white"}
      isOpen={modalData.type === "changepysical"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text"/>
          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
};

export default ChangePysical;
