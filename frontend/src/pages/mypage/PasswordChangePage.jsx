import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { BasicUrlState } from "../../recoil/common/BasicUrlState";

const PasswordChangePage = () => {
  const basicUrl = useRecoilValue(BasicUrlState);
  const {
    watch,
    setValue,
    getValues,
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      currentpassword: "",
      newPassword: "",
      newPasswordCheck: "",
    },
  });

  // 제출할 경우 api 요청 보낼 함수
  const onSubmit = (data) => {
    console.log(localStorage.getItem("userId"));
    async (event) => {
      event.preventDefault();
      await axios.patch(
        `${basicUrl}api/users/${localStorage.getItem("userId")}/password`,
        {
          currentpassword: data.currentpassword,
          newPassword: data.newPassword,
          newPasswordCheck: data.newPasswordCheck,
        }
      );
    };
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="currentPassword">현재 비밀번호</label>
      <input
        id="currentPassword"
        placeholder="기존 비밀번호"
        type="password"
        {...register("currentPassword", {
          required: true,
        })}
      />

      <label htmlFor="newPassword">새 비밀번호</label>
      <input
        id="newPassword"
        type="password"
        placeholder="새 비밀번호"
        {...register("newPassword", {
          required: true,
          pattern: {
            value:
              /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
            message: "영문, 숫자, 특수문자 포함 8 ~ 20자로 입력해주세요",
          },
        })}
      />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}

      <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
      <input
        id="newPasswordCheck"
        type="password"
        placeholder="새 비밀번호 확인"
        {...register("newPasswordCheck", {
          required: true,
          validate: {
            matchPassword: (value) => {
              const { newPassword } = getValues();
              return newPassword === value || "비밀번호가 일치하지 않습니다";
            },
          },
        })}
      />
      {errors.newPasswordCheck && <p>{errors.newPasswordCheck.message}</p>}
      <input type="submit" />
    </form>
  );
};

export default PasswordChangePage;
