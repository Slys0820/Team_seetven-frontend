export const UserDummyData = [
  {
    id: 1,
    name: "강지성",
    profileImg: "./user.png", // 기본 프로필 이미지 경로
    tags: ["소통왕", "아이디어 뱅크", "기획"],
    postId: 1, // 💡 중요: 어떤 모집글(Post id)에 지원했는지 연결하는 식별자
  },
  {
    id: 2,
    name: "김민수",
    profileImg: "./user.png",
    tags: ["리액트", "열정맨", "프론트엔드"],
    postId: 1,
  },
  {
    id: 3,
    name: "이영희",
    profileImg: "./user.png",
    tags: ["소통왕", "디자이너", "꼼꼼함"],
    postId: 1,
  },
  {
    id: 4,
    name: "박자바",
    profileImg: "./user.png",
    tags: ["백엔드", "스프링", "아이디어 뱅크"],
    postId: 1,
  },
  {
    id: 5,
    name: "최코드",
    profileImg: "./user.png",
    tags: ["리액트", "소통왕"],
    postId: 2, // 다른 글에 지원한 유저 예시
  },
];
