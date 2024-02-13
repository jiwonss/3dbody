import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

const SignUpModal = ({ onClose }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const signUpHandler = (data) => {
    axios({
      method: "post",
      url: `${baseUrl}api/auth/signup`,
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        gender: data.gender,
        birth_date: data.birth_date,
      },
    }).then((res) => {
      console.log(res);
      alert("회원가입이 완료되었습니다.")
      setModalData({ type: null, data: null })
    });
  };

  const emailCheck = () => {
    const email = watch("email");
    axios({
      method: "get",
      url: `${baseUrl}api/auth?email=${email}`,
    }).then((res) => {
      console.log(res);
      if (res.data.data_header.success_code) {
        alert("이미 가입한 이메일입니다.");
      } else {
        alert("가입 가능한 이메일입니다.");
      }
    });
  };

  useEffect(() => {
    if (
      watch("password") !== watch("passwordCheck") &&
      watch("passwordCheck")
    ) {
      setError("passwordCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다",
      });
    } else {
      // 비밀번호 일치시 오류 제거
      clearErrors("passwordCheck");
    }
  }, [watch("password"), watch("passwordCheck")]);

  return (
    <Modal
      className={"fixed transform -translate-y-1/2 top-1/2 overflow-auto inset-x-12"}
      isOpen={modalData.type === "signup"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <form
        onSubmit={handleSubmit(signUpHandler)}
        className="flex flex-col gap-2 p-4 bg-white border border-teal-700 rounded-md"
      >
        <h1 className="pb-2 text-lg text-center text-teal-700 underline underline-offset-4">
          회원가입
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: true,
            })}
            className="px-2 border rounded-md"
          />
          <input
            type="button"
            onClick={emailCheck}
            value="중복확인"
            className="w-1/2 mx-auto text-white bg-teal-700 border rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="px-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            autoComplete="on"
            {...register("password", {
              required: true,
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                message: "영문, 숫자, 특수문자 포함 8 ~ 20자로 입력해주세요",
              },
            })}
            className="px-2 border rounded-md"
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input
            id="passwordCheck"
            type="password"
            autoComplete="on"
            {...register("passwordCheck", {
              required: true,
              validate: {
                matchPassword: (value) => {
                  const { password } = getValues();
                  console.log(password, value);
                  return password === value || "비밀번호가 일치하지 않습니다";
                },
              },
            })}
            className="px-2 border rounded-md"
          />
          {errors.passwordCheck && <p className="text-xs text-red-500">{errors.passwordCheck.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <p>성별</p>
          <select
            name="gender"
            {...register("gender")}
            className="text-center border rounded-md"
          >
            <option value="MALE" className="text-xs">남자</option>
            <option value="FEMALE" className="text-xs">여자</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p>생년월일</p>
          <input
            type="date"
            {...register("birth_date", {
              required: true,
            })}
            className="text-center border rounded-md"
          />
        </div>

        <div className="flex gap-2 mt-4 mb-2">
          <input
            type="button"
            onClick={onClose}
            value={"취소"}
            className="border border-teal-700 rounded-md"
          />
          <input type="submit" className="text-white bg-teal-700 rounded-md" />
        </div>
      </form>
    </Modal>
  );
};

SignUpModal.propTypes = {
  onClose: PropTypes.func,
};

export default SignUpModal;
