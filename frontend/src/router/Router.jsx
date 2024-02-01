import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import MyPage from "../pages/mypage/MyPage";
import MyInfoPage from "../pages/mypage/MyInfoPage";
import NoticePage from "../pages/mypage/NoticePage";
import FAQPage from "../pages/mypage/FAQPage";
import DiaryPage from "../pages/diary/DiaryPage";
import ChallengePage from "../pages/challenge/ChallengePage";
import ChallengeDetailPage from "./../pages/challenge/ChallengeDetailPage";
import DiaryTrainingPage from "../pages/diary/DiaryTrainingPage";
import DiaryFoodPage from "../pages/diary/DiaryFoodPage";
import HomePage from "../pages/home/homePage";
import PasswordChangePage from "../pages/mypage/PasswordChangePage";
import TrainingLoadPage from "../pages/diary/training/trainingLoadPage";
import TrainingChoicePage from "./../pages/diary/training/TrainingChoicePage";
import ChallengeRegistrationPage from "./../pages/challenge/ChallengeRegistrationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "/diary",
        Component: DiaryPage,
      },
      {
        path: "/diary/training/:year/:month/:date",
        Component: DiaryTrainingPage,
      },
      {
        path: "/diary/food/:year/:month/:date",
        Component: DiaryFoodPage,
      },
      {
        path: "/diary/training/load",
        Component: TrainingLoadPage,
      },
      {
        path: "/diary/training/choice",
        Component: TrainingChoicePage,
      },
      {
        path: "/mypage",
        Component: MyPage,
      },
      {
        path: "/myinfo",
        Component: MyInfoPage,
      },
      {
        path: "/passwordchange",
        Component: PasswordChangePage,
      },
      {
        path: "/notice",
        Component: NoticePage,
      },
      {
        path: "/FAQ",
        Component: FAQPage,
      },
      {
        path: "/challenge",
        Component: ChallengePage,
      },
      {
        path: "challenge/:challengeId",
        Component: ChallengeDetailPage,
      },
      {
        path: "challenge/registration",
        Component: ChallengeRegistrationPage,
      },
    ],
  },
]);

export default router;
