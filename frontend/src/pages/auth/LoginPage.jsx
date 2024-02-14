import axios from "axios";
import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Button from "./../../components/common/Button";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { userState } from "../../recoil/common/UserState";
import { modalState } from "../../recoil/modal/ModalState";

const LoginPage = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const setUser = useSetRecoilState(userState);
  const setModalData = useSetRecoilState(modalState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpHandler = () => {
    setModalData({ type: "signup", data: "" });
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(`${baseUrl}api/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("isLogin", true);
        setUser({
          token: res.data.data_body.token.access_token,
          info: res.data.data_body.user_info,
        });
        window.location.replace("/");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-24">
      <div className="flex justify-center font-mono text-3xl text-teal-700">
        <img src="/fullLogo.png" alt="" className='w-3/5'/>
      </div>
      <form className="flex flex-col gap-4 p-4 border border-teal-700 rounded-md" onSubmit={onSubmitHandler}>
        <label className="font-mono">Email</label>
        <input type="email" value={email} onChange={onEmailHandler} className="px-2 py-1 border rounded-md"/>
        <label className="font-mono">Password</label>
        <input type="password" value={password} autoComplete="on" onChange={onPasswordHandler} className="px-2 py-1 border rounded-md"/>
        <Button type={"submit"} buttonName={"로그인"} btnCss={"py-1 text-white bg-teal-700 rounded-md"}/>
        <input type="button" onClick={onSignUpHandler} value={"회원가입"} className="py-1 text-white bg-teal-700 rounded-md"/>
      </form>
    </div>
  );
};

export default LoginPage;
