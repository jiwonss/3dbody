import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import PageTitle from "../../components/common/PageTitle";
import BackButton from "../../components/common/BackButton";

const PinChangePage = () => {
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
      currentPin: "",
      newPin: "",
      newPinCheck: "",
    },
  });
  // (새 비밀번호, 확인을 적고 난 후) 새 비밀 번호 변경 시에 확인 칸에 오류 문구를 띄우기 위한 함수
  useEffect(() => {
    if (watch("newPin") !== watch("newPinCheck") && watch("newPinCheck")) {
      setError("newPinCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다",
      });
    } else {
      // 비밀번호 일치시 오류 제거
      clearErrors("newPinCheck");
    }
  }, [watch("newPin"), watch("newPinCheck")]);

  // 제출할 경우 api 요청 보낼 함수
  const onSubmit = (data) => {
    console.log(data);
    axios({
      method: "patch",
      url: `${baseUrl}api/users/${user.info.userId}/password`,
      headers: { Authorization: `Bearer ${user.token}` },
      data: {
        currentPin: data.currentPin,
        newPin: data.newPin,
        newPinCheck: data.newPinCheck,
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
    <div>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="PIN 변경" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="currentPin">현재 pin번호</label>
        <input
          id="currentPin"
          placeholder="기존 비밀번호"
          type="password"
          maxLength={6}
          {...register("currentPin", {
            required: true,
            maxLength: 6,
          })}
        />

        <label htmlFor="newPin">새 Pin번호</label>
        <input
          id="newPin"
          type="password"
          placeholder="새 비밀번호"
          maxLength={6}
          {...register("newPin", {
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: "숫자만 입력해주세요",
            },
          })}
        />
        {errors.newPin && <p>{errors.newPin.message}</p>}

        <label htmlFor="newPinCheck">새 Pin번호 확인</label>
        <input
          id="newPinCheck"
          type="password"
          placeholder="새 비밀번호 확인"
          maxLength={6}
          {...register("newPinCheck", {
            required: true,
            validate: {
              matchPassword: (value) => {
                const { newPin } = getValues();
                return newPin === value || "비밀번호가 일치하지 않습니다";
              },
            },
          })}
        />
        {errors.newPinCheck && <p>{errors.newPinCheck.message}</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default PinChangePage;
