'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Comment', [
        {
          user_id: 13,
          lesson_id: 2,
          content: 'asdasd',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 8,
          lesson_id: 1,
          content: 'wqer',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 9,
          lesson_id: 3,
          content: 'asdasd',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 13,
          lesson_id: 3,
          content: 'asdasd',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 13,
          lesson_id: 2,
          content: 'asdsadfssdfdsfasd',
          stars: 2,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 11,
          lesson_id: 5,
          content: 'adsadasdadsdasd',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 3,
          lesson_id: 5,
          content: 'qqqqqqqqqasdasd',
          stars: 5,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comment', null, {});
  },
};
