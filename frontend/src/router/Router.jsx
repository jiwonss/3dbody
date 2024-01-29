import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MyPage from "../pages/mypage/MyPage";
import MyInfoPage from "../pages/mypage/MyInfoPage";
import NoticePage from "../pages/mypage/NoticePage";
import FAQPage from "../pages/mypage/FAQPage";
import ChallengePage from "../pages/challenge/ChallengePage"
import ChallengeDetailPage from './../pages/challenge/ChallengeDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path: "/mypage",
        Component: MyPage
      },
      {
        path: "/myinfo",
        Component: MyInfoPage
      },
      {
        path: "/notice",
        Component: NoticePage
      },
      {
        path: "/FAQ",
        Component: FAQPage
      },
      {
        path: "/challenge",
        Component: ChallengePage
      },
      {
        path: "challenge/:challengeId",
        Component: ChallengeDetailPage
      },
    ]
  },
]);

export default router
