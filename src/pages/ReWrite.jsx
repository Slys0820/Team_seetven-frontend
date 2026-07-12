import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PurpleHeaderNoBack from "../components/PurpleHeaderNoBack";
import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../api/axios";

const InputBox = styled.input`
  width: 100%;
  height: 2.5rem;
  border: 1px solid #cacaca;
  border-radius: 6px;
  outline: none;
  padding: 10px 16px 10px;
  box-sizing: border-box;
  font-size: 0.85rem;
  color: #1f2937;
  font-weight: bold;
  background-color: #ffffff;
  align-items: center;
  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #7063e3;
  }
`;
const P = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 5px;
`;
const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: none;
  outline: none;
  /* 💡 바닥 패딩을 기본 크기(10px)로 돌려줍니다. */
  padding: 0px 12px;
  box-sizing: border-box;
  font-size: 0.85rem;
  color: #1f2937;
  resize: none;
  margin-top: 10px;
  font-weight: bold;
  &::placeholder {
    color: #a9a5a5;
    font-size: 0.75rem;
    letter-spacing: -1px;
    font-weight: 550;
    font-family: "Pretendard";
  }

  &:focus {
    border-color: #7063e3;
  }
`;

const TextSet = styled.div`
  width: 100%;
  min-height: 120px;
  border: 1px solid #aaa7a7;
  border-radius: 10px;
  position: relative;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 24px;
  padding-bottom: 20px;
`;

// 💡 글자 수 표시가 위치할 텍스트 컴포넌트 따로 분리
const WordCounter = styled.span`
  position: absolute;
  /* 💡 중요: 박스 '내부'가 아니라 박스 '바깥 아래쪽'에 매달려 있게 세팅합니다 */
  bottom: 8px;
  right: 12px;
  font-size: 0.75rem;
  color: #9ca3af;
`;

const AddButton = styled.button`
  width: 23%;
  height: 2.5rem;
  border: none;
  border-radius: 10px;
  outline: none;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 0.74rem;
  font-weight: 570;
  color: white;
  background-color: #7063e3;
  padding: 10px 0px 10px;
`;

// 💡 타원형 자격증 태그 박스 스타일 추가
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 85%;
  margin-top: 12px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #7063e3;
  border-radius: 20px;
  padding: 2.5px 8.5px;
  font-size: 0.85rem;
  color: #7063e3;
  letter-spacing: -1px;
  font-weight: 600;

  button {
    background: none;
    border: none;
    color: #7063e3;
    margin-left: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0;

    font-weight: 600;

    &:hover {
      color: #7063e3;
    }
  }
`;

const InfoText = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  text-align: left;
  color: #1f2937;
  margin: 18px 0 6px 0;
  margin-bottom: 2px;

  &:first-of-type {
    margin-top: 10px;
  }
`;

const Line = styled.div`
  background-color: #aaa7a7;
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 90%;
  height: 3rem;
  background-color: #c4c4c4; /* 비활성화 기본 회색, 시안에 맞춤 */
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0; //다른 요소에 의해 영향 x
  /* 💡 추가하신 4줄 */
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);

  //비활성 상태
  cursor: not-allowed;

  //활성 상태
  &.ready {
    background-color: #7063e3;
    box-shadow: 0 4px 10px rgba(129, 140, 248, 0.3);
    cursor: pointer;
  }
`;

const Array = styled.div`
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 0 19px;
  box-sizing: border-box;
  overflow-x: hidden;
`;

// 메인 함수
function ReWrite() {
  const [email, setEmail] = useState("");
  const [career, setCareer] = useState([]);
  const [intruduction, setIntroduction] = useState("");
  const [selectedTendency, setSelectedTendency] = useState([]);
  const [careers, setCareers] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  // 💡 [추가] 현재 화면이 수정 모드(2번)인지 조회 모드(1번)인지 저장하는 상태 (기본값: false = 조회 상태)
  const [isEdit, setIsEdit] = useState(true);
  // 1️⃣ [GET]은 켜지자마자 실행되어야 하므로 useEffect 안에 넣음
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await instance.get("/api/profile/me"); // 백엔드에 GET 요청
        const data = response.data;

        // 💡 중요: 서버에서 받아온 기존 정보로 useState들을 미리 채워줍니다!
        setEmail(data.email);
        setIntroduction(data.selfIntroduction);
        setSelectedTendency(data.collaborationTags);
        setEmail(data.email);
        setName(data.name);
        setGender(data.gender);

        // 자격증 정보가 문자열 배열(["ADsP"])로 온다면 객체 배열([{id, text}])로 변환해서 채우기
        const mappedCareers = data.certificates.map((text, index) => ({
          id: Date.now() + index,
          text: text,
        }));
        setCareers(mappedCareers);
      } catch (error) {
        console.error("기존 프로필을 불러오지 못했습니다.", error);
      }
    };
  }, []); // 딱 1번만 실행됨
  // 2️⃣ [PATCH] 사용자가 수정한 후 [저장] 버튼을 누를 때 실행되는 함수
  const handleSave = async () => {
    try {
      const updatedData = {
        certificates: careers.map((item) => item.text),
        selfIntroduction: intruduction,
        collaborationTags: selectedTendency,
      };

      // 백엔드에 PATCH 요청을 보내서 갱신
      await instance.patch("/api/profile", updatedData);
      alert("수정이 완료되었습니다!");
      // 💡 [정답!] 서버 저장에 성공했으므로, 수정 모드를 풀고 다시 '조회 모드'로 화면을 돌려놓습니다.
      navigate("/main");
    } catch (error) {
      alert(error.response?.data?.message || "수정에 실패했습니다.");
      navigate("/main");
    }
  };

  const tendencies = [
    "# 리더 ",
    "# 아이디어 뱅크",
    "# 소통왕",
    "# 피드백 요청",
    "# 포토샵 장인",
    "# 꼼꼼한 마감파",
    "# 계획형 플래너",
    "# 속전속결",
  ];

  const handleSelect = (item) => {
    if (selectedTendency.includes(item)) {
      // 이미 선택된 거면 해제
      setSelectedTendency(selectedTendency.filter((i) => i !== item));
    } else {
      // 2개 미만일 때만 추가
      if (selectedTendency.length < 2) {
        setSelectedTendency([...selectedTendency, item]);
      }
    }
  };

  const handleAddCareer = () => {
    if (!career.trim()) return; // 빈칸이면 추가 안 함

    // 새 객체 생성 (나중에 DB 전송용 포맷)
    const newCareer = {
      id: Date.now(), // 고유한 ID 부여
      text: career.trim(),
    };

    setCareers([...careers, newCareer]); // 기존 배열에 붙이기
    setCareer(""); // 입력창 청소
  };

  // 💡 엔터키 쳐도 추가되게 보너스 기능!
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddCareer();
  };

  // 💡 자격증 삭제 함수
  const handleRemoveCareer = (id) => {
    // 클릭한 id를 가진 객체만 쏙 빼고 필터링
    setCareers(careers.filter((item) => item.id !== id));
  };
  const navigate = useNavigate();
  return (
    <div style={{ height: "100%" }}>
      <PurpleHeaderNoBack title="프로필 수정" root="/main" />
      <Array>
        {/* ================= 1. 기본정보 영역 ================= */}
        <InfoText>
          기본정보 <span style={{ color: "red" }}> *</span>
        </InfoText>
        <P>이름</P>
        <InputBox
          value={name}
          disabled
          style={{
            backgroundColor: "#f3f4f6",
            color: "#9ca3af",
            cursor: "not-allowed",
          }}
        />
        <P>성별</P>
        <InputBox
          value={gender}
          disabled
          style={{
            backgroundColor: "#f3f4f6",
            color: "#9ca3af",
            cursor: "not-allowed",
          }}
        />
        <P>이메일</P>
        <InputBox
          onKeyDown={handleKeyDown}
          value={email}
          disabled
          style={{
            backgroundColor: "#f3f4f6",
            color: "#9ca3af",
            cursor: "not-allowed",
          }}
        />

        <Line></Line>

        {/* ================= 2. 나의 협업 성향 영역 ================= */}
        <InfoText>
          나의 협업 성향
          <span style={{ color: "gray", fontSize: "0.85rem" }}>
            {" "}
            (2개 선택)
          </span>
          <span style={{ color: "red" }}> *</span>
        </InfoText>
        <div
          style={{
            color: "#A9A5A5",
            fontSize: "0.75rem",
            letterSpacing: "-1px",
            fontWeight: "550",
            marginBottom: "13px",
            marginTop: "5px",
          }}
        >
          키워드로 나를 표현해 보세요.
        </div>

        <div>
          {tendencies.map((item) => {
            const isSelected = selectedTendency.includes(item);
            return (
              <button
                key={item}
                /* 💡 수정 모드일 때만 클릭 이벤트를 작동시키고, 조회 모드일 때는 클릭 차단 */
                onClick={() => isEdit && handleSelect(item)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: isSelected ? "#7063e3" : "white",
                  color: isSelected ? "white" : "#AAA7A7",
                  border: "1px solid #C3BDBD",
                  borderRadius: "20px",
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                  marginRight: "10px",
                  marginBottom: "10px",
                  fontWeight: "600",
                  /* 💡 조회 모드(isEdit=false)일 때는 마우스 커서를 일반 화살표로 고정 */
                  cursor: !isEdit
                    ? "default"
                    : selectedTendency.length === 2 && !isSelected
                      ? "not-allowed"
                      : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {item}
                {/* 💡 선택된 항목이면서 + '수정 모드'일 때만 체크 아이콘 노출 */}
                {isSelected && (
                  <img
                    src="check.svg"
                    alt="체크"
                    style={{
                      marginLeft: "3px",
                      width: "15px",
                      height: "auto",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <Line style={{ marginTop: "10px" }}></Line>

        {/* ================= 3. 자격증 및 수상이력 영역 ================= */}
        <InfoText>
          자격증 및 수상이력{" "}
          <span style={{ color: "gray", fontSize: "0.85rem" }}>(선택)</span>
        </InfoText>

        {/* 💡 [조건부 렌더링] 수정 모드일 때만 입력창과 추가하기 버튼 노출 */}
        {isEdit && (
          <div style={{ display: "flex", gap: "7px", marginTop: "11px" }}>
            <InputBox
              onKeyDown={handleKeyDown}
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            />
            <AddButton onClick={handleAddCareer}>추가하기</AddButton>
          </div>
        )}

        {/* 등록된 자격증 뱃지 노출 영역 */}
        {careers.length > 0 && (
          <TagContainer style={{ marginTop: isEdit ? "12px" : "4px" }}>
            {careers.map((item) => (
              <Tag key={item.id}>
                {item.text}
                {/* 💡 수정 모드일 때만 삭제(X) 버튼을 보여줌 */}
                {isEdit && (
                  <button onClick={() => handleRemoveCareer(item.id)}>×</button>
                )}
              </Tag>
            ))}
          </TagContainer>
        )}

        <Line style={{ marginTop: "20px" }}></Line>

        {/* ================= 4. 자기소개 영역 ================= */}
        <InfoText>
          자기소개 <span style={{ color: "red" }}>*</span>
        </InfoText>
        <div
          style={{
            color: "#A9A5A5",
            fontSize: "0.75rem",
            letterSpacing: "-1px",
            fontWeight: "550",
            marginBottom: "8px",
          }}
        >
          프로젝트에 기여할 수 있는 나의 역량을 작성해 주세요.
        </div>

        {/* 💡 [조건부 렌더링] 모드에 따라 입력 테두리상자(TextSet) 스타일과 내부 태그 변환 */}
        <TextSet
          style={{
            border: !isEdit ? "none" : "1px solid #aaa7a7",
            padding: !isEdit ? "0px" : "0 0 20px 0",
          }}
        >
          {isEdit ? (
            // ⭕ 수정 모드일 때는 기존의 입력 창(TextArea)과 글자수 카운터 노출
            <>
              <TextArea
                maxLength={300}
                placeholder="나의 강점, 자격증, 프로젝트 경험, 사용 가능한 툴 등"
                value={intruduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
              <WordCounter>{intruduction.length}/300자</WordCounter>
            </>
          ) : (
            // ❌ 조회 모드일 때는 스크롤이 가능한 일반 뷰용 div 텍스트 노출 (textarea 대신)
            <div
              style={{
                width: "100%",
                fontSize: "0.85rem",
                color: "#1f2937",
                fontWeight: "bold",
                lineHeight: "160%",
                whiteSpace: "pre-wrap",
                padding: "8px 4px",
              }}
            >
              {intruduction || "등록된 자기소개가 없습니다."}
            </div>
          )}
        </TextSet>

        {/* ================= 5. 하단 버튼 영역 ================= */}
        {isEdit ? (
          // ⭕ 수정 모드일 때는 [저장]용 버튼 노출 (기존 SubmitButton 활성화 로직 유지)
          <SubmitButton
            onClick={handleSave}
            className={
              intruduction && selectedTendency.length === 2 ? "ready" : ""
            }
          >
            저장
          </SubmitButton>
        ) : (
          // ❌ 조회 모드일 때는 언제나 활성화된 보라색 [수정하기] 버튼 노출
          <SubmitButton
            onClick={() => setIsEdit(true)} // 클릭 시 즉시 수정 레이아웃으로 변경
            className="ready"
          >
            수정하기
          </SubmitButton>
        )}

        <div style={{ height: "100px" }}></div>
      </Array>
    </div>
  );
}

export default ReWrite;
