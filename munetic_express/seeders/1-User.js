'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User', [
      {
        type: 'Student',
        login_id: '42kunlee',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'kunlee',
        name: '쿠운리',
        name_public: true,
        gender: 'Male',
        birth: 940302,
        email: '42.kunlee@gmail.com',
        phone_number: '010-1234-1234',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. kunlee입니다. 반가워요',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Tutor',
        login_id: '42jolim',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'jolim',
        name: '조올림',
        name_public: true,
        gender: 'Male',
        birth: 980220,
        email: '42.jolim@gmail.com',
        phone_number: '010-5678-5678',
        phone_public: false,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. jolim입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Student',
        login_id: '42chaepark',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'chaepark',
        name: '채애팤',
        name_public: false,
        gender: 'Female',
        birth: 901231,
        email: '42.chaepark@gmail.com',
        phone_number: '010-1234-5678',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. chaepark입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Student',
        login_id: 'june',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'juny',
        name: '김쭌',
        name_public: false,
        gender: 'Male',
        birth: 901231,
        email: '42.june@gmail.com',
        phone_number: '010-1234-5679',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. june입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Tutor',
        login_id: 'James',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'james',
        name: '젬스',
        name_public: false,
        gender: 'Male',
        birth: 901211,
        email: '42.james@gmail.com',
        phone_number: '010-1234-5670',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. james입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Student',
        login_id: 'Alice',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'alice',
        name: '이앨리스',
        gender: 'Female',
        name_public: false,
        birth: 901211,
        email: '42.alice@gmail.com',
        phone_number: '010-1234-5230',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. alice입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Student',
        login_id: 'Halo',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'halo',
        name: '이할로',
        name_public: false,
        gender: 'Male',
        birth: 901211,
        email: '42.halo@gmail.com',
        phone_number: '010-1134-5230',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. halo입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Tutor',
        login_id: 'Jennifer',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: 'jennnifer',
        name: '박제니퍼',
        name_public: false,
        gender: 'Female',
        birth: 901211,
        email: '42.jennifer@gmail.com',
        phone_number: '010-2434-5230',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. jennifer입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Tutor',
        login_id: 'chalotte',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: '42jchlotte',
        name: '오샬롯',
        name_public: false,
        gender: 'Female',
        birth: 901211,
        email: '42.challote@gmail.com',
        phone_number: '010-2444-5230',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. chalotte입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Student',
        login_id: 'chrix',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: '42jchris',
        name: '박크리스',
        name_public: false,
        gender: 'Male',
        birth: 901211,
        email: '42.chris@gmail.com',
        phone_number: '010-3544-5230',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. chris입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Tutor',
        login_id: 'kunkun',
        login_password:
          '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        nickname: '42kunkun',
        name: '이쿤쿤',
        name_public: false,
        gender: 'Female',
        birth: 901211,
        email: '42.kunkun@gmail.com',
        phone_number: '010-1444-5230',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. kunkun입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Tutor',
        login_id: 'jk',
        login_password:
          '$2b$10$jAMRsEnxgNPgJk3G30q9UesajgSAwuy8aXgNWCgEd1WdETSLtUHY.',
        nickname: 'june777',
        name: '김준준',
        name_public: false,
        gender: 'Male',
        birth: 990211,
        email: '42.june777@gmail.com',
        phone_number: '010-1404-1230',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. june777입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Tutor',
        login_id: 'abc',
        login_password:
          '$2b$10$jAMRsEnxgNPgJk3G30q9UesajgSAwuy8aXgNWCgEd1WdETSLtUHY.',
        nickname: 'juke777',
        name: '김준악',
        name_public: false,
        gender: 'Male',
        birth: 910211,
        email: '42.ark777@gmail.com',
        phone_number: '010-3408-1230',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. juneark입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        type: 'Student',
        login_id: 'qwe',
        login_password:
          '$2b$10$jAMRsEnxgNPgJk3G30q9UesajgSAwuy8aXgNWCgEd1WdETSLtUHY.',
        nickname: 'pqakr',
        name: '김우아',
        name_public: false,
        gender: 'Female',
        birth: 970311,
        email: '42.woowa@gmail.com',
        phone_number: '010-9134-1430',
        phone_public: true,
        image_url: '/img/basicProfileImg.png',
        introduction: '안녕하세요. woowa입니다. test data입니다.',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};