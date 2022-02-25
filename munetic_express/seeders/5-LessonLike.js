'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('LessonLike', [
        {
          user_id: 15,
          lesson_id: 1,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 2,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 3,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 4,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 5,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 15,
          lesson_id: 6,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 4,
          lesson_id: 1,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 4,
          lesson_id: 2,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 4,
          lesson_id: 3,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 5,
          lesson_id: 1,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 5,
          lesson_id: 2,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          user_id: 5,
          lesson_id: 3,
          lesson_like: 1,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('LessonLike', null, {});
  },
};
