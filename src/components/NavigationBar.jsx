import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import WholePost from "../pages/WholePost";

const Icon = ({ name, activeSrc, inactiveSrc, isActive, movePath }) => {
  // 아이콘과 밑에 글자 묶음 컴포넌트
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(movePath)} style={navItemStyle}>
      <img
        src={isActive ? activeSrc : inactiveSrc}
        alt={name}
        style={{ width: "25px", height: "25px" }}
      />
      {/* 2. 이미지 밑에 띄워줄 글자 */}
      <span
        style={{
          fontSize: "12px",
          color: isActive ? "#7063E3" : "#AAA7A7",
          marginTop: "4px",
        }}
      >
        {name}
      </span>
    </div>
  );
};

// 3. 네비게이션 바 전체 스타일
const navBarStyle = {
  display: "flex",
  justifyContent: "space-around", // 4개의 아이콘을 가로로 균등하게 분배
  alignItems: "center",
  backgroundColor: "#ffffff",
  padding: "12px 0 10% 0", // 아이폰 하단 홈 바 공간을 위해 밑에 여백(24px)을 줌
  borderRadius: "24px 24px 0 0", // 윗부분 모서리만 둥글게
  position: "fixed", // 화면 하단에 고정
  bottom: 0,
  left: 0,
  width: "100%",
  boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.15)", // 은은한 상단 그림자
};

const navItemStyle = {
  // 아이콘 묶음 스타일
  display: "flex",
  flexDirection: "column", // 💡 핵심: 이미지와 글자를 '세로'로 줄 세우기!
  alignItems: "center", // 가로 기준 정중앙 정렬
  cursor: "pointer",
};

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div style={navBarStyle}>
        {/* 💡 개별 메뉴 버튼 (홈) */}
        <Icon
          activeSrc="PHome.png"
          inactiveSrc="Home.png"
          isActive={["/main", "/wholepost"].includes(location.pathname)} // []안에 포함된 주소들에서 보랴색이됨
          name="홈"
          movePath={"/main"}
        />
        <Icon
          activeSrc="Pusers.png"
          inactiveSrc="users.png"
          isActive={["/myteam"].includes(location.pathname)}
          name="My 팀"
          movePath={"/myteam"}
        />
        <Icon
          activeSrc="Parchive.png"
          inactiveSrc="archive.png"
          isActive={["/storage"].includes(location.pathname)}
          name="보관함"
          movePath={"/storage"}
        />
        <Icon
          activeSrc="PFrame 47.png"
          inactiveSrc="Frame 47.png"
          isActive={["/"].includes(location.pathname)}
          name="설정"
        />
        {/* 나머지 My 팀, 보관함, 설정 버튼들도 동일한 구조로 배치 */}
      </div>
    </>
  );
};
export default NavigationBar;
