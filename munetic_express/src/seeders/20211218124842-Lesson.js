'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Lesson', [
      {
        tutor_id: 3,
        category_id: 1,
        title: '지금까지 이런 기타 레슨은 없었다.',
        price: 100000,
        location: '서울시',
        minute_per_lesson: 60,
        content: '더 이상 설명이 필요 없습니다. 믿고 따라오세요.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 3,
        category_id: 2,
        title: '기타만 잘 치는 줄 아셨죠? 바이올린도 합니다.',
        price: 200000,
        location: '서울시',
        minute_per_lesson: 80,
        content:
          '헨리도 저한테 바이올린 배웠습니다. 더 이상 설명이 필요 없습니다. 믿고 따라오세요.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 3,
        category_id: 3,
        title: '죄송합니다. 드럼도 가르쳐드립니다.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          '드럼드럼드럼드럼드럼드럼 더 이상 설명이 필요 없습니다. 믿고 따라오세요.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
        deletedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 6,
        category_id: 4,
        title: 'This is for U',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          '당신을 위한 강의.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 6,
        category_id: 5,
        title: '이거 배울 사람?',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          '나만 믿고 따라와. 너두? 야 나두.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 6,
        category_id: 3,
        title: 'Life is not easy.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          'But U can do this shit',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 3,
        category_id: 3,
        title: 'I\'m not made of steel.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          'Don\'t forget that I\'m human.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 9,
        category_id: 2,
        title: 'Don\'t forget that I\'m real.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          'Act like U know me.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 10,
        category_id: 1,
        title: 'But U never will.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          'There\'s one thing that I know for sure.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 10,
        category_id: 3,
        title: 'I will show U.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          'Du dududu du~~ dududu dududududu du.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 12,
        category_id: 2,
        title: '샤대생이 가르치는 음악.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          '믿고 따라와. 돈만 있으면 다 돼.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 12,
        category_id: 6,
        title: '최저가 강의 고퀄로 만나보세요.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          '훌륭.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 12,
        category_id: 4,
        title: 'You gotta go and get angry at all of my honestly.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          'I am sorry... yeah I knowwww that I let u down.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        tutor_id: 12,
        category_id: 5,
        title: 'Is it too late to say sorry now.',
        price: 50000,
        location: '경기도',
        minute_per_lesson: 40,
        content:
          'Du Roooooo Du rooooo.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lesson', null, {});
  },
};
