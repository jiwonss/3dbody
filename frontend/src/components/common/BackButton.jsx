import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <>
      <button>
        <ChevronLeftIcon
          className="w-6 h-6 text-blue-500"
          onClick={onClickBtn}
        />
      </button>
    </>
  );
};

export default BackButton;
