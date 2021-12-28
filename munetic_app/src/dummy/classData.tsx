export interface classDataType {
  id: number;
  title: string;
  img: string;
  category: string | undefined;
  nickname: string;
  phone_number: string;
  age: number;
  place: string;
  price: number;
  gender: string;
  minute: number;
  content: string;
}

export const classData: classDataType[] = [
  {
    id: 1,
    title: '하프 레슨 합니다.',
    img: '/img/testImg.png',
    category: '하프',
    nickname: 'kunlee',
    phone_number: '010-1234-1234',
    age: 40,
    place: '서울',
    price: 80000,
    gender: 'Male',
    minute: 60,
    content:
      '안녕하세여~~~~ 하프 레슨 합니다. 너 때문에 흥이 다 깨져버렸으니 책임져!',
  },
  {
    id: 2,
    title: '기타 배우고 싶은 사람?',
    img: '/img/testImg.png',
    category: '기타',
    nickname: 'jolim',
    phone_number: '010-5678-5678',
    age: 25,
    place: '대전',
    price: 100000,
    gender: 'Male',
    minute: 30,
    content: '기타 배우고 싶은 사람 모여라~~~ 빈 백으로 모여라~~',
  },
  {
    id: 3,
    title: '첼로 컴온',
    img: '/img/testImg.png',
    category: '첼로',
    nickname: 'chaepark',
    phone_number: '010-1234-5678',
    age: 35,
    place: '제주',
    price: 70000,
    gender: 'Female',
    minute: 20,
    content: '첼로를 배우고 싶으면 장갑을 준비하세요',
  },
  {
    id: 4,
    title: '드럼 빼고 다 가능인데 드럼 강의함 잘리나 테스트',
    img: '/img/testImg.png',
    category: '드럼',
    nickname: 'nobody',
    phone_number: '010-0000-0000',
    age: 60,
    place: 'Nowhere',
    price: 120000,
    gender: 'None',
    minute: 60,
    content: "I'm nobody",
  },
  {
    id: 5,
    title: '그냥 오세요',
    img: '/img/testImg.png',
    category: '피아노',
    nickname: 'pianist',
    phone_number: '010-1111-1111',
    age: 20,
    place: '부산',
    price: 150000,
    gender: 'Male',
    minute: 60,
    content: '피아노 배우고 싶다..',
  },
];
