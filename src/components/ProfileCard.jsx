import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css";

const cardStyle = {
  // 슬라이드 카드 스타일
  backgroundColor: "#E5E5E5",
  borderRadius: "20px",
  padding: "40px 20px",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",
  height: "100%",
};

const Circle = styled.div`
  // 원형 프로필 스타일
  border-radius: 100%;
  border: 1px solid black;
  width: 50%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const XButton = styled.img`
  // x버튼 스타일
  position: absolute;
  top: 5%;
  left: 90%;
  cursor: pointer;
`;

const NextButton = ({ onClick, name }) => {
  // 하단 버튼 컴포넌트 onClick: 클릭시 실행함수, name: 하단 버튼 이름
  const navigate = useNavigate();
  return <button onClick={onClick}>{name}</button>;
};

const ProfileCard = ({ onClick, name, xClick }) => {
  // 하단버튼기능, 하단버튼 이름, x버튼 기능
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Swiper
        modules={[Pagination]} // 하단 점(페이지네이션) 기능을 위한 모듈 등록
        spaceBetween={20} // 슬라이드 사이의 간격 (px)
        slidesPerView={1} // 한 번에 보여줄 슬라이드 개수
        pagination={{ clickable: true }} // 하단 점 표시 및 클릭 가능하게 설정
        style={{
          width: "98%",
          aspectRatio: "1/1.6", //슬라이드의 가로:세로 비율을 1:2로 설정
          position: "relative",

          // Swiper 내부 테마 색상 커스텀 (하단 점 색상을 검은색으로 변경)
          "--swiper-pagination-color": "#000000",
          "--swiper-pagination-bullet-inactive-color": "#999999",
        }}
      >
        {/* 📄 슬라이드 1: 김멋사 프로필 앞면 */}
        <SwiperSlide>
          <div className="card-container" style={cardStyle}>
            <XButton src="X.png" alt="x버튼" onClick={xClick} />

            {/* 원형 프로필, 이름, 학과, 태그 등 구현 */}
            <Circle>
              <img src="user.png" alt="프로필 이미지" />
            </Circle>
            <div className="avatar"></div>
            <h2>김멋사</h2>
            <p>경영학과 | 인천대학교 2학년</p>
            {/* 태그 및 하단 버튼 */}
            <NextButton onClick={onClick} name={name} />
          </div>
        </SwiperSlide>

        {/* 📄 슬라이드 2: 자격증 및 자기소개 뒷면 */}
        <SwiperSlide>
          <div className="card-container" style={cardStyle}>
            {/* 자격증 및 수상이력, 자기소개 내용 구현 */}
            <XButton src="X.png" alt="x버튼" onClick={xClick} />
            <h3>자격증 및 수상이력</h3>
            <p>컴퓨터활용능력 1급...</p>
            <h3>자기소개</h3>
            <p>안용</p>
            <p>
              <img src="send.png" alt="이메일 아이콘" /> 이메일
            </p>
            <NextButton onClick={onClick} name={name} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProfileCard;
