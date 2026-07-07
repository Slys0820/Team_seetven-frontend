export const DummyData = [
  // 1. 기획 카테고리
  {
    id: 1,
    category: "기획",
    title: "청년 정책 아이디어 모집",
    name: "김갱공",
    date: "26.07.01",
    isClosed: false,
    views: 120, // 🚀 동적 데이터 추가
    scraps: 32, // 🚀 동적 데이터 추가
    announcement: "https://www.youtube.com",
    dueDate: "2026.07.15 (화) 23:59",
    memberCount: "00명",
    method: "비대면",
    purpose: "공모전 수상 목표",
    content:
      "기존 공모문의 핵심은 마케팅과 디자인입니다. 특히 크리에이티브의 감각이 중요합니다. 매주 주말마다 디스코드를 통해 회의를 할 예정입니다! 성실한 분이면 좋겠습니다.",
    isUploaded: true, // 내가 올린 모집글 필터 테스트용
    isApplied: false, // ⭕ 철자 오타 수정 완료 (isApllied -> isApplied)
  },
  {
    id: 2,
    category: "기획",
    title: "IT 스타트업 서비스 기획 팀원 구합니다",
    name: "아샷추",
    date: "26.07.05",
    isClosed: true,
    views: 84, // 🚀 동적 데이터 추가
    scraps: 12, // 🚀 동적 데이터 추가
    announcement: "https://www.youtube.com",
    dueDate: "2026.07.05 (토) 18:00",
    memberCount: "3명",
    method: "대면 (강남역)",
    purpose: "실전 창업 및 포트폴리오",
    content:
      "현재 와이어프레임 설계 단계입니다. 서비스 기획 고도화 및 피치덱 제작 함께하실 열정적인 팀원 모집합니다. 개발 연계까지 고려 중입니다.",
    isUploaded: false,
    isApplied: true, // ⭕ 철자 오타 수정 완료 및 내가 신청한 모집글 필터 테스트용
  },

  // 2. 광고/마케팅 카테고리
  {
    id: 3,
    category: "광고/마케팅",
    title: "브랜드 숏폼 영상 광고 공모전 함께하실 분!",
    name: "아이디어맨",
    date: "26.07.06",
    isClosed: false,
    views: 204, // 🚀 동적 데이터 추가
    scraps: 56, // 🚀 동적 데이터 추가
    announcement: "https://www.youtube.com",
    dueDate: "2026.07.25 (토) 23:59",
    memberCount: "0명 (영상 편집 1명 필수)",
    method: "혼합 (주 1회 대면)",
    purpose: "공모전 수상 및 상금",
    content:
      "Z세대를 타깃으로 한 트렌디한 숏폼 영상 광고 기획서 및 촬영 진행할 크루 구합니다! 현재 콘셉트 라인업은 대략 짜두었고, 스토리보드 구체화부터 함께해요.",
    isUploaded: true, // 기본값 추가
    isApplied: false, // 기본값 추가
  },

  // 3. 과학/공학 카테고리
  {
    id: 4,
    category: "과학/공학",
    title: "공공데이터 활용 스마트시티 앱 개발 대회",
    name: "코딩지옥",
    date: "26.07.06",
    isClosed: false,
    views: 312, // 🚀 동적 데이터 추가
    scraps: 89, // 🚀 동적 데이터 추가
    announcement: "https://www.youtube.com",
    dueDate: "2026.08.10 (월) 17:00",
    memberCount: "프론트 1명, 백엔드 1명",
    method: "비대면 (디스코드)",
    purpose: "포트폴리오 및 수상",
    content:
      "공공 API를 활용하여 교통/환경 문제를 해결하는 웹/앱 서비스를 빌딩할 예정입니다. 리액트나 스프링부트 숙련자 분들 환영합니다. 디자인은 잡혀있습니다.",
    isUploaded: false, // 기본값 추가
    isApplied: true, // 기본값 추가
  },

  // 4. 네이밍/슬로건 카테고리
  {
    id: 5,
    category: "네이밍/슬로건",
    title: "전통시장 활성화 슬로건 공모전 가볍게 나가실 분",
    name: "카피라이터",
    date: "26.07.06",
    isClosed: false,
    views: 45, // 🚀 동적 데이터 추가
    scraps: 7, // 🚀 동적 데이터 추가
    announcement: "https://www.youtube.com",
    dueDate: "2026.07.20 (월) 23:59",
    memberCount: "1~2명",
    method: "비대면 (카톡 진행)",
    purpose: "가벼운 참여 및 경험",
    content:
      "부담 없이 톡으로 아이디어 툭툭 던지면서 싱크빅 하실 분 구합니다! 카피라이팅이나 언어유희 좋아하시는 분들 같이 머리 싸매고 한 줄 찌끄려봐요.",
    isUploaded: false, // 기본값 추가
    isApplied: false, // 기본값 추가
  },
];
