import * as LessonService from '../../service/lesson.service';

// 테스트는 시드를 바탕으로 구성되어있습니다.

const user1FromSeed = {
  type: 'STUDENT',
  login_id: '42kunlee',
  nickname: 'kunlee',
  name: '쿠운리',
  gender: 'MALE',
  age: 29,
  name_public: true,
  birth: 940302,
  email: '42.kunlee@gmail.com',
  phone_number: '010-1234-1234',
  phone_public: true,
  image_url: '../../munetic_app/public/img/testImg.png',
  introduction: '안녕하세요. kunlee입니다. test data입니다.',
};

describe('레슨 생성 : LessonService.createLesson unit test', () => {
  const infoLeast: LessonService.LessonEditable = {
    category: '기타',
    title: 'title',
  };

  const infoComplete: LessonService.LessonEditable = {
    category: '피아노',
    title: 'tyle',
    price: 1000,
    location: '서울',
    minute_per_lesson: 30,
    content: '잘',
  };
  it('최소한의 정보로 레슨을 만들어야 한다.', () => {
    return LessonService.createLesson(1, infoLeast)
      .then(res => {
        expect(res).toEqual({
          lesson_id: 1,
          tutor_id: 1,
          title: 'title',
          price: undefined,
          location: undefined,
          minute_per_lesson: undefined,
          content: undefined,
          Category: { name: '기타' },
          User: user1FromSeed,
        });
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });

  it('완전한 정보로 레슨을 만들어야 한다.', () => {
    return LessonService.createLesson(1, infoComplete)
      .then(res => {
        expect(res).toEqual({
          lesson_id: 2,
          tutor_id: 1,
          title: 'tyle',
          price: 1000,
          location: '서울',
          minute_per_lesson: 30,
          content: '잘',
          Category: { name: '피아노' },
          User: user1FromSeed,
        });
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });

  it('잘못된 튜터 아이디라고 판단해야한다.', () => {
    return LessonService.createLesson(11231321, infoLeast)
      .then(res => {
        expect(res).toEqual('해당하는 튜터가 없습니다.');
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });

  it('잘못된 카테고리 이름이라고 판단한다.', () => {
    return LessonService.createLesson(1, { category: '얼후', title: '양' })
      .then(res => {
        expect(res).toEqual('해당하는 카테고리 이름이 없습니다.');
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });
});

describe('레슨 조회: LessonService.findLesson unit test', () => {
  it('저장되어있는 레슨을 찾는다', () => {
    return LessonService.findLesson(1)
      .then(res => {
        expect(res).toEqual({
          lesson_id: 1,
          tutor_id: 1,
          title: 'title',
          price: undefined,
          location: undefined,
          minute_per_lesson: undefined,
          content: undefined,
          Category: { name: '기타' },
          User: user1FromSeed,
        });
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });

  it('저장되어 있지 않는 레슨은 찾지 못한다.', () => {
    return LessonService.findLesson(23124112)
      .then(res => {
        expect(res).toEqual('해당하는 레슨이 없습니다.');
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });
});

describe('레슨 수정: LessonService.editLesson unit test', () => {
  const editting1: LessonService.LessonEditable = {
    content: '오이오이!',
    price: 5252,
  };

  it('저장되어있는 레슨을 수정하여 수정된 결과를 리턴한다.', () => {
    return LessonService.editLesson(1, editting1)
      .then(res => {
        expect(res).toEqual({
          lesson_id: 1,
          tutor_id: 1,
          title: 'title',
          price: 5252,
          location: undefined,
          minute_per_lesson: undefined,
          content: '오이오이!',
          Category: { name: '기타' },
          User: user1FromSeed,
        });
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });

  it('잘못된 카테고리 이름이라고 판단한다.', () => {
    return LessonService.editLesson(1, { ...editting1, category: '오이' })
      .then(res => {
        expect(res).toEqual('해당하는 카테고리 이름이 없습니다.');
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });

  it('잘못된 레슨 아이디라고 판단한다.', () => {
    return LessonService.editLesson(123124, editting1).then(res => {
      expect(res).toEqual('해당하는 레슨이 없습니다.');
    });
  });
});

describe('레슨 삭제: LessonService.removeLesson unit test', () => {
  it('레슨을 DB에서 삭제한다.', () => {
    return LessonService.removeLesson(2)
      .then(res => {
        expect(res).toEqual({ removed: true });
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });

  it('존재하지 않는 레슨은 삭제하지 못한다.', () => {
    return LessonService.removeLesson(2)
      .then(res => {
        expect(res).toEqual('해당하는 레슨이 없습니다.');
      })
      .catch(err => {
        expect(err).toEqual(undefined);
      });
  });
});
