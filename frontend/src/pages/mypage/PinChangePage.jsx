import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import PageTitle from "../../components/common/PageTitle";
import BackButton from "../../components/common/BackButton";

const PinChangePage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const [user, setUser] = useRecoilState(userState);
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
    axios({
      method: "patch",
      url: `${baseUrl}api/users/${user.info.userId}/pin`,
      headers: { Authorization: `Bearer ${user.token}` },
      data: {
        current_pin: data.currentPin,
        new_pin: data.newPin,
        new_pin_check: data.newPinCheck,
      },
    }).then((res) => {
      console.log(res);
      if (res.data.data_header.success_code === 0) {
        alert("PIN 번호가 변경되었습니다.");
        setUser({
          token: user.token,
          info: { ...user.info, pin: data.newPin },
        });
        window.location.reload("/");
      } else {
        alert(res.data.data_header.result_message);
        reset();
      }
    });
  };

  return (
    <div>
      <div className="absolute">
        <BackButton />
      </div>
      <PageTitle pageTitle="PIN 변경" />

      <div className="m-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label htmlFor="currentPin">현재 PIN번호</label>
          <input
            className="p-2 border-2 rounded-md"
            id="currentPin"
            placeholder="기존 PIN번호"
            type="password"
            autoComplete="on"
            maxLength={6}
            {...register("currentPin", {
              required: true,
              maxLength: 6,
            })}
          />

          <label htmlFor="newPin">새 PIN번호</label>
          <input
            className="p-2 border-2 rounded-md"
            id="newPin"
            type="password"
            autoComplete="on"
            placeholder="새 PIN번호"
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

          <label htmlFor="newPinCheck">새 PIN번호 확인</label>
          <input
            className="p-2 border-2 rounded-md"
            id="newPinCheck"
            type="password"
            autoComplete="on"
            placeholder="새 PIN번호 확인"
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

          <input
            type="submit"
            className="p-2 text-white bg-teal-700 border rounded-md"
          />
        </form>
      </div>
    </div>
  );
};

export default PinChangePage;
