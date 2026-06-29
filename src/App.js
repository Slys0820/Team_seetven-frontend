import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from "./styles";
import MainPage from "./pages/MainPage";


function App() {
  return (
    <>
    <GlobalStyles/>
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
