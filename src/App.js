import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles";
import AppLayout from "./styles/AppLayout";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainHome from "./pages/MainHome";
import Certification from "./pages/Certification";
import Post from "./pages/Post";
import WriteEnd from "./pages/WriteEnd";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/main" element={<MainHome />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
