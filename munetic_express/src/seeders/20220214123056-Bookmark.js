'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Bookmark', [
        {
          user_id: 15,
          lesson_id: 1,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 2,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 3,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 4,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 5,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 6,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 4,
          lesson_id: 1,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 4,
          lesson_id: 2,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 4,
          lesson_id: 3,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 5,
          lesson_id: 1,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 5,
          lesson_id: 2,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 5,
          lesson_id: 3,
          lesson_bookmark: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bookmark', null, {});
  },
};
