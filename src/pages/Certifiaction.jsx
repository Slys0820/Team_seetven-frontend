import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100dvh - 65px); /* type2 헤더 높이(65px) 제외 */
  overflow-y: auto;
  padding: 30px 20px 40px 20px; /* 좌우 여백 추가 */
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 상단 아이콘 (보라색 체크 방패 느낌)
const BadgeIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ede9fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-self: flex-start; /* 왼쪽 정렬 */
  margin-bottom: 20px;
  color: #6366f1;
  font-size: 1.5rem;
`;

// 메인 타이틀 영역
const TitleArea = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 30px;

  h2 {
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 1.4;
    margin: 0;
    color: #111111;
  }
  span {
    color: #6366f1; /* 보라색 강조 문구 */
  }
  p {
    font-size: 0.85rem;
    color: #a0a0a0;
    margin: 8px 0 0 0;
  }
`;

// 서브 타이틀 (인증 서류 첨부)
const SubTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin: 0 0 10px 0;
`;

// 파일 업로드 커스텀 박스
const FileUploadBox = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  padding: 0 15px;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 8px;

  span {
    font-size: 0.85rem;
    color: #b0b0b0;
  }
  .icon {
    color: #6366f1;
    font-weight: bold;
  }
`;

// 보안 안내 문구 (자물쇠 아이콘 표시 구역)
const SecurityNotice = styled.p`
  font-size: 0.75rem;
  color: #666666;
  width: 100%;
  text-align: left;
  margin: 0 0 25px 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;

// 하단 연보라색 안내판 박스
const InfoGuideBox = styled.div`
  width: 100%;
  background-color: #f5f3ff;
  border-radius: 12px;
  padding: 15px;
  box-sizing: border-box;
  text-align: left;
  margin-bottom: auto; /* 남은 공간을 밀어내서 버튼을 바닥 쪽으로 유도 */

  h4 {
    font-size: 0.85rem;
    font-weight: bold;
    color: #4c1d95;
    margin: 0 0 10px 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 0.8rem;
    color: #6b7280;
    margin-bottom: 6px;
    line-height: 1.4;
    display: flex;
    gap: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// 제출하기 버튼
const SubmitButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #c4c4c4; /* 비활성화 기본 회색, 시안에 맞춤 */
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
`;

function Certification() {
  const navigate = useNavigate();

  return (
    <>
      {/* 아까 만든 보라색/회색 스타일인 type2 매칭 */}
      <HeaderComponent title="학교 인증" type="type2" />
      <Box>
        {/* 아이콘 (임시 방패 이모지 대체, 원하시면 이미지 태그로 변경) */}
        <div style={{ width: "100%", display: "flex" }}>
          <BadgeIcon>🛡️</BadgeIcon>
        </div>

        <TitleArea>
          <h2>
            학교 인증으로
            <br />
            <span>안전한 팀 매칭</span>을 시작하세요!
          </h2>
          <p>
            재학/휴학 증빙을 통해 신뢰할 수 있는 팀 매칭 환경을 만들고 있어요.
          </p>
        </TitleArea>

        <SubTitle>인증 서류 첨부</SubTitle>

        {/* 실제 파일 인풋은 숨기고 label로 커스텀 디자인 구현 */}
        <input type="file" id="school-file" style={{ display: "none" }} />
        <FileUploadBox htmlFor="school-file">
          <span>사진 선택하기</span>
          <span className="icon">🔗</span>
        </FileUploadBox>

        <SecurityNotice>
          🔒 입력하신 정보는 학생 신분 확인 용도로만 사용되며, 승인 후 즉시
          파기됩니다.
        </SecurityNotice>

        <InfoGuideBox>
          <h4>ℹ️ [ 인증 서류 첨부 안내 ]</h4>
          <ul>
            <li>✔️ 학생증 : 성명, 학교명, 학번, 사진이 포함된 앞면</li>
            <li>✔️ 재학/휴학 증명서: 최근 1개월 이내에 발급된 서류</li>
            <li>✔️ 포털 로그인 화면: 학교 로고와 이름이 함께 나오는 화면</li>
          </ul>
        </InfoGuideBox>

        <SubmitButton>제출하기</SubmitButton>
      </Box>
    </>
  );
}

export default Certification;
