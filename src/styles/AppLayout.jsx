import styled from "styled-components";

// 기능 바깥쪽 영역, 공백 부분
const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
  background-color: #fdfdfd;
`;

// 실제 모바일 화면 영역
const MobileContainer = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100dvh;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AppLayout = ({ children }) => {
  return (
    <Background>
      <MobileContainer>{children}</MobileContainer>
    </Background>
  );
};

export default AppLayout;
