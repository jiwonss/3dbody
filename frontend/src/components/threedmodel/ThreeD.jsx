import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { modelTokenState } from "../../recoil/common/ModelTokenState";
import { userState } from "../../recoil/common/UserState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";

const ThreeD = () => {
  const [token, setToken] = useRecoilState(modelTokenState);
  const [user, setUser] = useRecoilState(userState);
  const baseUrl = useRecoilValue(baseUrlState);
  let asset_id = "";

  const get3dToken = () => {
    axios({
      method: "post",
      url: "/realms/meshcapade-me/protocol/openid-connect/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        grant_type: "password",
        client_id: "meshcapade-me",
        username: "rkdtjdrnjs11@naver.com",
        password: "rkdtjdrnjs11",
      },
    }).then((res) => {
      console.log(res);
      setToken(res.data.access_token);
    });
  };
  const createModel = () => {
    axios({
      method: "post",
      url: "avatars/create/from-measurements",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: "test1",
        gender: "male",
        measurements: {
          Height: 172,
          Weight: 70,
        },
      },
    }).then((res) => {
      console.log(res.data);
      asset_id = res.data.id;
      axios({
        method: "post",
        url: `avatars/${asset_id}/export`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { format: "obj", pose: "a" },
      }).then((res) => {
        console.log(res);
        axios({
          method: "post",
          url: `${baseUrl}api/3d/${user.info.userId}/current`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            asset_id: asset_id,
            avatar_url: res.data.url.path,
          },
        }).then(() => {});
      });
    });
  };
  return (
    <div>
      <button onClick={() => get3dToken()}>토큰 받기</button>
      <button onClick={() => createModel()}>모델 생성</button>
    </div>
  );
};

export default ThreeD;
