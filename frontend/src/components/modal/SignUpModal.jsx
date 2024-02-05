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
      className={"fixed bottom-0 w-full bg-white"}
      isOpen={modalData.type === "signup"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <form onSubmit={handleSubmit(signUpHandler)}>
        <h1>회원가입</h1>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: true,
          })}
        />
        <input type="button" onClick={emailCheck} value="중복확인" />
        <label htmlFor="name">이름</label>
        <input type="text" id="name" {...register("name")} />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              message: "영문, 숫자, 특수문자 포함 8 ~ 20자로 입력해주세요",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input
          id="passwordCheck"
          type="password"
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
        />
        {errors.passwordCheck && <p>{errors.passwordCheck.message}</p>}
        <select name="gender" {...register("gender")}>
          <option value="MALE">남자</option>
          <option value="FEMALE">여자</option>
        </select>
        <input
          type="date"
          {...register("birth_date", {
            required: true,
          })}
        />
        <input type="button" onClick={onClose} value={"취소"} />
        <input type="submit" />
      </form>
    </Modal>
  );
};

SignUpModal.propTypes = {
  onClose: PropTypes.func,
};

export default SignUpModal;
