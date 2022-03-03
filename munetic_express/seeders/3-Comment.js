'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Comment', [
        {
          user_id: 13,
          lesson_id: 2,
          content: '안녕하세요',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 8,
          lesson_id: 1,
          content: '반가워요',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 9,
          lesson_id: 3,
          content: '좋아요',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 13,
          lesson_id: 3,
          content: '짱이에요',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 13,
          lesson_id: 2,
          content: '너무 좋아요',
          stars: 2,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 11,
          lesson_id: 5,
          content: '좋습니다',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 3,
          lesson_id: 5,
          content: '굿이에요',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 1,
          lesson_id: 5,
          content: '그저 그래요',
          stars: 3,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 2,
          lesson_id: 5,
          content: '별로에요',
          stars: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comment', null, {});
  },
};
