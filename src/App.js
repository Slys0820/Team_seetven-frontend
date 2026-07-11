import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GlobalStyles } from "./styles";
import AppLayout from "./styles/AppLayout";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainHome from "./pages/MainHome";
import Certification from "./pages/Certification";
import Post from "./pages/Post";
import WriteEnd from "./pages/WriteEnd";
import MakeProfileCard from "./pages/MakeProfileCard";
import NavigationBar from "./components/NavigationBar"; // 임포트 누락 방지!
import CertificationWait from "./pages/CertificationWait";
import WholePost from "./pages/WholePost";
import Storage from "./pages/Storage";
import AcceptEnd from "./pages/AcceptEnd";
import WriteGather from "./pages/WriteGather";
import WriteEndTwo from "./pages/WriteEndTwo";
import ReWrite from "./pages/ReWrite";
import MyTeam from "./pages/MyTeam";

// 💡 1. 주소를 감시하고 레이아웃을 뿌려줄 실질적인 메인 컴포넌트
function AppContent() {
  const location = useLocation(); // 이제 <BrowserRouter> 내부이므로 정상 작동합니다!

  // 하단 네비게이션 바를 숨기고 싶은 주소들
  const excludePaths = [
    "/signup",
    "/",
    "/wait",
    "/writeendtwo",
    "/certification",
    "/writegather",
    "/writeend",
    "/acceptend",
    "/rewrite",
    "/makeprofilecard",
  ];
  const showNavBar =
    !excludePaths.includes(location.pathname) &&
    !location.pathname.startsWith("/post/"); //고정 주소에 포함되거나, 주소가 "/post/"로 시작하면 네비게이션 바 숨기기

  return (
    <AppLayout>
      {/* 알맹이 화면 영역, 주소는 여기다 추가하면 됨*/}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainHome />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/certification" element={<Certification />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/wait" element={<CertificationWait />} />
        <Route path="/wholepost" element={<WholePost />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/writegather" element={<WriteGather />} />
        <Route path="/writeend" element={<WriteEnd />} />
        <Route path="/acceptend" element={<AcceptEnd />} />
        <Route path="/makeprofilecard" element={<MakeProfileCard />} />
        <Route path="/writeendtwo" element={<WriteEndTwo />} />
        <Route path="/rewrite" element={<ReWrite />} />
        <Route path="/myteam" element={<MyTeam />} />
      </Routes>
      {/* 💡 네비게이션 바가 존재하는 창에서는 네비게이션을 보여주기*/}
      {showNavBar && <NavigationBar />}
    </AppLayout>
  );
}

// 💡 2. 최상위 App 컴포넌트는 오직 <BrowserRouter> 울타리만 쳐줍니다.
function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AppContent /> {/* 울타리 안에서 모든 로직이 돌아가도록 대피시킴 */}
      </BrowserRouter>
    </>
  );
}

export default App;
