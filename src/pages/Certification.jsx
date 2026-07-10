import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PurpleHeader from "../components/PurpleHeader";
import instance from "../api/axios";
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
  height: 2.5rem;
  border: 1.5px solid #cacaca;
  border-radius: 8px;
  padding: 0 15px;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 8px;
  flex-shrink: 0; //다른 요소에 의해 영향 x

  span {
    font-size: 0.85rem;
    color: #b0b0b0;
  }
  .icon {
    color: #6366f1;
    font-weight: bold;
  }
`;

// 자물쇠 아이콘 표시 구역 부분
const SecurityNotice = styled.p`
  font-size: 0.7rem;
  color: #000000;
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
  flex-shrink: 0; //다른 요소에 의해 영향 x

  //비활성 상태
  cursor: not-allowed;

  //활성 상태
  &.ready {
    background-color: #7063e3;
    box-shadow: 0 4px 10px rgba(129, 140, 248, 0.3);
    cursor: pointer;
  }
`;

function Certification() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 유저가 선택한 첫 번째 파일
    if (file) {
      setSelectedFile(file); // 파일이 있으면 상태에 저장
    } else {
      setSelectedFile(null); // 취소했으면 다시 null
    }
  };

  // 1️⃣ [임시 확인용] 백엔드 주소 나오기 전까지 활성화해서 테스트하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    // FormData에 규격대로 담기는지 가상 검증
    const formData = new FormData();
    formData.append("file", selectedFile);

    console.log("=== 📦 서버로 보낼 파일 데이터 ===");
    console.log("Key 명칭: file");
    console.log("파일명:", selectedFile.name);

    alert(
      `[임시 테스트: 서류 제출 완료]\n` +
        `파일명: ${selectedFile.name}\n` +
        `승인 대기(PENDING) 상태로 전환되어 페이지를 이동합니다.`
    );

    // 💡 코드 주석에 적어두셨던 대기중 페이지 경로("/wait")로 자연스럽게 라우팅
    navigate("/wait");
  };

  /* 2️⃣ [실제 연동용] 내일 주소 나오면 1번 함수를 지우고 이 주석을 풀어서 사용할 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    // 명세서 규격에 맞게 멀티파트 폼 데이터 생성
    const formData = new FormData();
    formData.append("file", selectedFile); // 명세서 요구 Key: file

    try {
      const response = await instance.post("/api/auth/school-verification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 성공 시 처리 (상태코드 200 OK)
      if (response.data && response.data.isSuccess) {
        alert(response.data.message || "인증 서류가 제출되었습니다.");
        navigate("/wait"); 
      } else {
        alert("서류 제출 중 알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message;

        if (status === 400) {
          alert(serverMessage || "잘못된 요청 양식입니다.");
        } else if (status === 401) {
          alert(serverMessage || "인증 권한이 없습니다. 다시 로그인해 주세요.");
        } else {
          alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
      } else {
        alert("네트워크 연결이 불안정합니다.");
      }
      console.error("학교 인증 통신 실패 내역:", error);
    }
  };
  */
  return (
    <>
      <PurpleHeader title="학교 인증" type="type1" root="/signup" />
      <Box>
        <div style={{ width: "100%", display: "flex", marginTop: "5rem" }}>
          <BadgeIcon>
            <img src="./security.png" />
          </BadgeIcon>
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
        <input
          type="file"
          id="school-file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <FileUploadBox htmlFor="school-file">
          <span>{selectedFile ? selectedFile.name : "사진 선택하기"}</span>
          <span className="icon">
            <img
              src="./link.png"
              style={{ transform: "scale(0.9) translateY(2px)" }}
              alt="링크 이미지"
            />
          </span>
        </FileUploadBox>

        <SecurityNotice>
          <img src="lock2.png" /> 입력하신 정보는 학생 신분 확인 용도로만
          사용되며, 승인 후 즉시 파기됩니다.
        </SecurityNotice>

        <InfoGuideBox>
          <h4>
            <img
              src="./alert.png"
              style={{
                transform: "scale(1.13)",
                marginRight: "8px",
                transform: "translateY(2px)",
              }}
            />
            [ 인증 서류 첨부 안내 ]
          </h4>
          <ul>
            <li>
              <img src="./check.png" /> 학생증 : 성명, 학교명, 학번, 사진이
              포함된 앞면
            </li>
            <li>
              <img src="./check.png" /> 재학/휴학 증명서: 최근 1개월 이내에
              발급된 서류
            </li>
            <li>
              <img src="./check.png" />
              포털 로그인 화면: 학교 로고와 이름이 함께 나오는 화면
            </li>
          </ul>
        </InfoGuideBox>

        <SubmitButton
          onClick={handleSubmit}
          className={selectedFile ? "ready" : ""}
          disabled={!selectedFile}
        >
          제출하기
        </SubmitButton>
      </Box>
    </>
  );
}

export default Certification;
