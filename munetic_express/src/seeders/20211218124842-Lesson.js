'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Lesson', [
      {
        tutor_id: 2,
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
        tutor_id: 2,
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
        tutor_id: 2,
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
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lesson', null, {});
  },
};
