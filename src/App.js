import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles";
import AppLayout from "./styles/AppLayout";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainHome from "./pages/MainHome";

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
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
