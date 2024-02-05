import axios from "axios";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/common/UserState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";
import { useNavigate } from "react-router-dom";

const UserDelete = () => {
  const user = useRecoilValue(userState);
  const baseUrl = useRecoilValue(baseUrlState);
  const navigate = useNavigate();
  useEffect(() => {
    if (confirm("정말 탈퇴하시겠습니까?")) {
      axios({
        method: "delete",
        url: `${baseUrl}api/users/${user.info.userId}`,
        headers: { Authorization: `Bearer ${user.token}` },
      }).then((res) => {
        console.log(res);
        if (res.data.data_header.success_code === 0) {
          localStorage.clear();
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      });
    } else {
      navigate(-1);
    }
  }),
    [];
};

export default UserDelete;
