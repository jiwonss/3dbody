import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";

const PasswordChangePage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const user = useRecoilValue(userState);
  const {
    watch,
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
      currentPassword: "",
      newPassword: "",
      newPasswordCheck: "",
    },
  });
  // (새 비밀번호, 확인을 적고 난 후) 새 비밀 번호 변경 시에 확인 칸에 오류 문구를 띄우기 위한 함수
  useEffect(() => {
    if (
      watch("newPassword") !== watch("newPasswordCheck") &&
      watch("newPasswordCheck")
    ) {
      setError("newPasswordCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다",
      });
    } else {
      // 비밀번호 일치시 오류 제거
      clearErrors("newPasswordCheck");
    }
  }, [watch("newPassword"), watch("newPasswordCheck")]);

  // 제출할 경우 api 요청 보낼 함수
  const onSubmit = (data) => {
    console.log(data);
    console.log(localStorage.getItem("userId"));
    axios({
      method: "patch",
      url: `${baseUrl}api/users/${user.info.userId}/password`,
      headers: { Authorization: `Bearer ${user.token}` },
      data: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        newPasswordCheck: data.newPasswordCheck,
      },
    }).then((res) => {
      if (res.data.dataHeader.successCode === 0) {
        localStorage.clear();
        window.location.reload("/");
      } else {
        alert("비밀번호 변경 실패 재입력!!");
        reset();
      }
      console.log(res);
    });
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
