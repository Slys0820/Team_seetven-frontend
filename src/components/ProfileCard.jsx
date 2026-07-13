import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css";
import { normalizeProfileData } from "../utils/normalizeProfileData";

const CardContent = styled.div`
  //두번째 페이지 스타일
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 19px;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const cardStyle = {
  // 슬라이드 카드 스타일
  background: "linear-gradient(160deg, #313B60, #182138)",
  borderRadius: "20px",
  padding: "40px 18px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",
  height: "100%",
  color: "#FFFFFF",
};
const CardLine = styled.div`
  // 슬라이드 카드안 라인 스타일
  border-radius: 20px;
  padding: 40px 20px;
  display: flex;
  box-sizing: border-box;
  height: 96%;
  width: 95.5%;
  top: 1.8%;
  border: 2px solid #7b81c2;
  position: absolute;
  /* 💡 추가: 이 박스는 마우스 클릭이나 손가락 터치를 완전히 무시하고 뒤로 통과시킵니다 */
  pointer-events: none;
`;

const XButton = styled.img`
  // x버튼 스타일
  position: absolute;
  top: 3.5%;
  left: 88%;
  cursor: pointer;
  width: 24px;
  height: auto;
`;

const ConfirmButton = styled.button`
  width: 87%;
  height: 3rem;
  background: linear-gradient(to right, #5850b5, #323568);
  border: 2px solid #c9a286;
  border-radius: 6px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 47px;
  position: absolute;
  top: 77%;
`;
const Mail = styled.div`
  width: 87%;
  height: 3rem;
  border: 1px solid #7b81c2;
  border-radius: 6px;
  color: #7063e3;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 47px;
  position: absolute;
  top: 68%;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #2b3351;
  justify-content: center;

  &::after {
    content: "";
    width: 28px;
    height: 1px;
  }
`;

const NextButton = ({ onClick, name }) => {
  // 하단 버튼 컴포넌트 onClick: 클릭시 실행함수, name: 하단 버튼 이름
  const navigate = useNavigate();
  return <ConfirmButton onClick={onClick}>{name}</ConfirmButton>;
};

// 키워드 박스 스타일
const KeywordBox = styled.div`
  padding: 6px 16px;
  color: #ffffff;
  font-size: 0.7rem;
  border: 1px solid #b7b7b7;

  gap: 10px;

  opacity: 1;
  border-radius: 6px;
  border-width: 1px;
  padding-top: 6px;
  padding-right: 30px;
  padding-bottom: 6px;
  padding-left: 30px;
`;

// 키워드 목록 가로 배열
const KeywordRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;

// 1. 스타일드 컴포넌트 세팅
const LicenseContainer = styled.div`
  width: 100%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px; /* 리스트 사이의 간격 */
`;

const LicenseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 500;

  /* 시안의 보라색 원형 점 구현 */
  &::before {
    content: "";
    width: 9px;
    height: 9px;
    background-color: #7063e3; /* 보라색 점 색상 */
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const Title = styled.h3`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 140%;
  letter-spacing: -1px;
  color: #e5c489;
  margin: 0;
`;

const Line = styled.div`
  flex: 1; /* 왼쪽, 오른쪽 선이 남는 공간을 반반씩 똑같이 채움 */
  height: 1px; /* 선 두께 */
  background: #e3c082;

  /* 오른쪽 선은 반대로 중심에서 바깥으로 흐려지도록 대칭 처리 */
  &:last-child {
    background: #e3c082;
  }
`;

const StarIcon = styled.img`
  width: 20px; /* 별 이미지 크기 */
  height: auto;
`;

const IntroductionText = styled.div`
  width: 87%; /* 카드 내부 가로 너비에 맞춤 */
  color: #ffffff;
  font-size: 0.95rem;
  line-height: 160%;
  text-align: left; /* 왼쪽 정렬 */
  white-space: pre-wrap; /* 💡 백엔드에서 받아온 줄바꿈(\n)을 그대로 화면에 먹여주는 속성 */

  /* 💡 핵심: 스크롤 및 높이 제한 정의 */
  max-height: 150px; /* 👈 원하는 최대 높이를 적어주세요. 이 높이를 넘어가면 스크롤이 생깁니다 */
  overflow-y: auto; /* 👈 내용이 max-height를 넘길 때만 스크롤바가 생기게 함 */
  margin-bottom: 10px; /* 👈 아래 이메일 버튼과의 최소 간격 10px 유지 */
  /* 💡 오늘의 치트키: 스크롤이 부모/배경으로 전파되는 것을 꽁꽁 묶어버립니다 */
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch; /* iOS 모바일에서 스크롤을 부드럽게 굴려주는 속성 */
  /* 💡 추가: 테두리선(CardLine)보다 무조건 위로 띄워서 터치를 직접 받게 합니다 */
  z-index: 10;
`;

// 컴포넌트 위는 다
const ProfileCard = ({ onClick, name, xClick, profileData }) => {
  console.log("현재 ProfileCard가 받은 데이터:", profileData);
  // 하단버튼기능, 하단버튼 이름, x버튼 기능
  {
    /* 
  // 나중에 백엔드 데이터로 교체할 임시 데이터
  const keywords = ["# 기획", "# 소통왕"];
  // 테스트를 위해 자격증이 6개 있는 더미 데이터입니다.
  // 만약 개수를 4개 이하로 줄이면 '외 N건' 없이 전부 노출됩니다.
  const dummyLicenses = [
    "컴퓨터 활용 능력 1급",
    "국가 디지털아트 공모전 3위",
    "데이터 분석 자격증 (ADsP)",
    "SQL 개발자 (SQLD)",
    "정보처리기사",
    "TOEIC 850점",
  ];
  const licenses = dummyLicenses;
*/
  }
  const normalizedProfileData = normalizeProfileData(profileData);
  const keywords = Array.isArray(normalizedProfileData.collaborationTags)
    ? normalizedProfileData.collaborationTags
    : [];
  const licenses = Array.isArray(normalizedProfileData.certificates)
    ? normalizedProfileData.certificates
    : [];
  const memberName = normalizedProfileData.name ?? "";
  const major = normalizedProfileData.major ?? "";
  const school = normalizedProfileData.school ?? "";
  const email = normalizedProfileData.contactEmail ?? "";
  const selfIntroduction = normalizedProfileData.selfIntroduction ?? "";
  const grade = normalizedProfileData.grade ?? "";
  const gradeLabel = grade ? `${grade}학년` : "";

  const genderMap = {
    //남여 변환 용
    male: "남자",
    female: "여자",
  };
  const gender = genderMap[normalizedProfileData.gender] ?? "";
  // 💡 핵심 로직: 화면에 그려줄 자격증 배열 가공하기
  const renderLicenses = () => {
    // 1. 자격증이 4개 이하인 경우: 있는 그대로 전부 보여줌
    if (licenses.length <= 4) {
      return licenses.map((license, index) => (
        <LicenseItem key={index}>{license}</LicenseItem>
      ));
    }

    // 2. 자격증이 5개 이상인 경우: 앞의 3개만 자르고 + '외 N건' 추가
    const firstThree = licenses.slice(0, 3); // 0, 1, 2번 인덱스만 추출
    const extraCount = licenses.length - 3; // 나머지 개수 계산 (전체 - 3)

    return (
      <>
        {/* 앞의 3개 맵핑 */}
        {firstThree.map((license, index) => (
          <LicenseItem key={index}>{license}</LicenseItem>
        ))}
        {/* 나머지 개수 표시 */}
        <LicenseItem>외 {extraCount} 건</LicenseItem>
      </>
    );
  };
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
          aspectRatio: "1/1.85", //슬라이드의 가로:세로 비율을 1:2로 설정
          position: "relative",
          "--swiper-pagination-bottom": "3.5%",
          "--swiper-pagination-bullet-size": "10px",

          // Swiper 내부 테마 색상 커스텀 (하단 점 색상을 검은색으로 변경)
          "--swiper-pagination-color": "#5D4BFF",
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-opacity": "1",
        }}
      >
        {/* 📄 슬라이드 1: 김멋사 프로필 앞면 */}
        <SwiperSlide>
          <div className="card-container" style={cardStyle}>
            <CardLine />
            <XButton src="xx.png" alt="x버튼" onClick={xClick} />

            {/* 원형 프로필, 이름, 학과, 태그 등 구현 */}
            <img
              style={{
                width: "85%",
                height: "auto",
                marginTop: "12%",
                marginBottom: "13%",
              }}
              src="Profile.png"
              alt="프로필"
            />
            <div className="avatar"></div>
            <h2
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
                fontSize: "48px",
                lineHeight: "140%",
                letterSpacing: "-0.025em",
                textAlign: "center",
                margin: "0",
              }}
            >
              {memberName}
            </h2>
            <p
              style={{
                fontFamily:
                  "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontSize: "23px",
                fontWeight: 570 /* 💡 SemiBold는 fontWeight: 600으로 표현합니다 */,
                lineHeight: "140%",
                letterSpacing:
                  "-1.5px" /* 💡 자간 -2.5%는 (24px * -0.025 = -0.6px)로 계산해서 넣어야 정확합니다 */,
                textAlign: "center",
                color: " #8376E9",
                margin: "0",
                marginTop: "11px",

                /* leading-trim: NONE 은 브라우저 기본값이므로 생략해도 무방합니다. */
              }}
            >
              {major}
            </p>
            <p
              style={{
                marginTop: "4px",
                marginBottom: "21px",
                color: "#E3E3E3",
              }}
            >
              {school} | {gradeLabel} | {gender}
            </p>
            {/* 태그 및 하단 버튼 */}
            <KeywordRow>
              {keywords.map((keyword, index) => (
                <KeywordBox key={index}>{keyword}</KeywordBox>
              ))}
            </KeywordRow>
            <NextButton onClick={onClick} name={name} />
          </div>
        </SwiperSlide>

        {/* 📄 슬라이드 2: 자격증 및 자기소개 뒷면 */}
        <SwiperSlide>
          <div className="card-container" style={cardStyle}>
            {/* 자격증 및 수상이력, 자기소개 내용 구현 */}
            <CardLine />
            <CardContent>
              <XButton src="xx.png" alt="x버튼" onClick={xClick} />

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center" /* 💡 아이콘과 글자의 세로 정렬 중심을 완벽하게 맞춥니다 */,
                  gap: "10px" /* 💡 아이콘과 '자기소개' 글자 사이의 가로 여백을 줍니다 */,
                  marginBottom: "15px",
                }}
              >
                <img src="profile1.png" alt="자격증 " />
                <Title>자격증 및 수상이력</Title>
              </div>
              {/* 💡 가공된 자격증 리스트 렌더링 */}
              <LicenseContainer>{renderLicenses()}</LicenseContainer>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  margin: "13px auto",
                  gap: "12px",
                }}
              >
                <Line />
                <StarIcon src="Stars.svg" alt="star" />
                <Line />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center" /* 💡 아이콘과 글자의 세로 정렬 중심을 완벽하게 맞춥니다 */,
                  gap: "10px" /* 💡 아이콘과 '자기소개' 글자 사이의 가로 여백을 줍니다 */,
                  marginBottom: "15px",
                }}
              >
                <img src="profile2.png" alt="자기소개 " />
                <Title>자기소개</Title>
              </div>
              <IntroductionText>{selfIntroduction}</IntroductionText>
            </CardContent>
            <NextButton onClick={onClick} name={name} />
            <Mail>
              <img
                style={{ width: "28px", height: "auto" }}
                src="send.svg"
                alt="이메일 아이콘"
              />{" "}
              {email}
            </Mail>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProfileCard;
