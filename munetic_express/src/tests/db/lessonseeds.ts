import { Gender } from '../../models/user.model';

export const user1 = {
  nickname: 'kunlee',
  name: '쿠운리',
  gender: Gender.Male,
  name_public: true,
  birth: '1994-03-02',
  image_url: '../../munetic_app/public/img/testImg.png',
};

export const user2 = {
  nickname: 'jolim',
  name: '조올림',
  gender: Gender.Male,
  name_public: true,
  birth: '1998-02-20',
  image_url: '../../munetic_app/public/img/testImg.png',
};

export const lesson1 = {
  lesson_id: 1,
  tutor_id: 2,
  title: '지금까지 이런 기타 레슨은 없었다.',
  price: 100000,
  location: '서울시',
  minute_per_lesson: 60,
  content: '더 이상 설명이 필요 없습니다. 믿고 따라오세요.',
  Category: {
    name: '기타',
  },
  User: user2,
};

export const lesson2 = {
  lesson_id: 2,
  tutor_id: 2,
  title: '기타만 잘 치는 줄 아셨죠? 바이올린도 합니다.',
  price: 200000,
  location: '서울시',
  minute_per_lesson: 80,
  content:
    '헨리도 저한테 바이올린 배웠습니다. 더 이상 설명이 필요 없습니다. 믿고 따라오세요.',
  Category: {
    name: '바이올린',
  },
  User: user2,
};

export const lesson3 = {
  lesson_id: 3,
  tutor_id: 2,
  title: '죄송합니다. 드럼도 가르쳐드립니다.',
  price: 50000,
  location: '경기도',
  minute_per_lesson: 40,
  content:
    '드럼드럼드럼드럼드럼드럼 더 이상 설명이 필요 없습니다. 믿고 따라오세요.',
  Category: {
    name: '드럼',
  },
  User: user2,
};
