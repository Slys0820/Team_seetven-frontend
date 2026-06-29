import styled from "styled-components";
import { useNavigate } from "react-router-dom";



const Temp_style = styled.div`
      display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`


function MainPage() {
  const navigate = useNavigate();
    return(
        <>
        <Temp_style>
            <h1>아직 빈 화면 입니다(현재 페이지: MainPage)</h1>

        </Temp_style>


        </>
    )
}

export default MainPage;