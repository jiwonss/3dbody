import {
  ExclamationCircleIcon,
  LockClosedIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Menu from "./Menu";

const Menus = () => {
  const categorylist = [
    {
      category: "비밀번호",
      list: [
        {
          menuicon: <LockClosedIcon className="w-6 h-6" />,
          menutitle: "비밀번호 변경",
          menuurl: "/mypage/passwordchange",
        },
        {
          menuicon: <Squares2X2Icon className="w-6 h-6" />,
          menutitle: "PIN 번호 변경",
          menuurl: "/",
        },
      ],
    },
    {
      category: "서비스",
      list: [
        {
          menuicon: <MegaphoneIcon className="w-6 h-6" />,
          menutitle: "공지사항",
          menuurl: "/mypage/notice",
        },
        {
          menuicon: <QuestionMarkCircleIcon className="w-6 h-6" />,
          menutitle: "자주 묻는 질문",
          menuurl: "/mypage/FAQ",
        },
      ],
    },
    {
      category: "탈퇴",
      list: [
        {
          menuicon: <ExclamationCircleIcon className="w-6 h-6" />,
          menutitle: "회원 탈퇴",
          menuurl: "/",
        },
      ],
    },
  ];
  return (
    // 카테고리 별로 하위 컴포넌트로 menulist 전달
    <>
      {categorylist.map((menulist) => {
        return (
          <div key={menulist.category}>
            <div>{menulist.category}</div>
            <Menu menus={menulist.list} />
          </div>
        );
      })}
    </>
  );
};

export default Menus;
