import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import MyPage from "../pages/mypage/MyPage";
import MyInfoPage from "../pages/mypage/MyInfoPage";
import NoticePage from "../pages/mypage/NoticePage";
import FAQPage from "../pages/mypage/FAQPage";
import DiaryPage from '../pages/diary/DiaryPage';
import ChallengePage from "../pages/challenge/ChallengePage"
import ChallengeDetailPage from './../pages/challenge/ChallengeDetailPage';
import DiaryTrainingPage from '../pages/diary/DiaryTrainingPage';

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
        path: "/diary",
        Component: DiaryPage
      },
      {
        path: "/diary/training/:year/:month/:day",
        Component: DiaryTrainingPage
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
