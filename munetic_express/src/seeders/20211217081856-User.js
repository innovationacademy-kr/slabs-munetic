'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User', [
      {
        type: 'STUDENT',
        login_id: '42kunlee',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'kunlee',
        name: '쿠운리',
        gender: 'MALE',
        name_public: true,
        birth: 940302,
        email: '42.kunlee@gmail.com',
        phone_number: '010-1234-1234',
        phone_public: true,
        image_url: '../../munetic_app/public/img/testImg.png',
        introduction: '안녕하세요. kunlee입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'TUTOR',
        login_id: '42jolim',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'jolim',
        name: '조올림',
        gender: 'Male',
        name_public: true,
        birth: 980220,
        email: '42.jolim@gmail.com',
        phone_number: '010-5678-5678',
        phone_public: false,
        image_url: '../../munetic_app/public/img/testImg.png',
        introduction: '안녕하세요. jolim입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'STUDENT',
        login_id: '42chaepark',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'chaepark',
        name: '채애팤',
        gender: 'Female',
        name_public: false,
        birth: 901231,
        email: '42.chaepark@gmail.com',
        phone_number: '010-1234-5678',
        phone_public: true,
        image_url: '../../munetic_app/public/img/testImg.png',
        introduction: '안녕하세요. chaepark입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
