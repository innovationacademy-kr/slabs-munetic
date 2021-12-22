import {
  LessonEditable,
  createLesson,
  LessonRes,
  checkLessonEditable,
} from '../../service/lesson.service';

describe('lesson service test', () => {
  it('should check whether the argument set is LessonEditable', () => {
    expect(checkLessonEditable({})).toEqual(null);
    const partial0 = { category: 'category' };
    expect(checkLessonEditable(partial0)).toEqual(partial0);
    const partial1 = { category: 'category', title: 'title' };
    expect(checkLessonEditable(partial1)).toEqual(partial1);
    const partial2 = { category: 'category', title: 'title', price: 1 };
    expect(checkLessonEditable(partial2)).toEqual(partial2);
    const partial3 = {
      category: 'category',
      title: 'title',
      price: 1,
      location: 'location',
    };
    expect(checkLessonEditable(partial3)).toEqual(partial3);
    const partial4 = {
      category: 'category',
      title: 'title',
      price: 1,
      location: 'location',
      minute_per_lesson: 1,
    };
    expect(checkLessonEditable(partial4)).toEqual(partial4);
    const complete = {
      category: 'category',
      title: 'title',
      price: 1,
      location: 'location',
      minute_per_lesson: 1,
      content: 'content',
    };
    expect(checkLessonEditable(complete)).toEqual(complete);
  });

  it('should create a lesson', async () => {
    const lessonInfo: LessonEditable = {
      category: '드럼',
      title: 'hello',
      price: 30000,
      location: 'Seoul',
      minute_per_lesson: 60,
      content: 'missing',
    };

    expect(await createLesson(2, lessonInfo)).toMatchObject({
      tutor_name: '조올림',
      gender: 'MALE',
      age: 29,
      profile_pic: '../../munetic_app/public/img/testImg.png',
      editable: {
        category: '드럼',
        title: 'hello',
        price: 30000,
        location: 'Seoul',
        minute_per_lesson: 60,
        content: 'missing',
      },
    });
  });

  it('should fail and emit a string', async () => {
    const lessonInfo: any = {
      category: '드럼',
      title: 'hello',
      price: '24', // price
      location: 'Seoul',
      minute_per_lesson: 23,
      content: 'missing',
    };

    expect(await createLesson(2, lessonInfo)).toEqual('Invalid data passed');
  });

  it('should fail and emit a string', async () => {
    const lessonInfo: any = {
      category: { type: '기타' }, // object
      title: 'hello',
      price: 30000,
      location: 'Seoul',
      minute_per_lesson: 23,
      content: 'missing',
    };

    expect(await createLesson(2, lessonInfo)).toEqual('Invalid data passed');
  });

  it('should fail and emit a string', async () => {
    const lessonInfo: any = {
      category: '기타',
      titel: 'hello', // titel
      price: 30000,
      location: 'Seoul',
      minute_per_lesson: 23,
      content: 'missing',
    };

    expect(await createLesson(2, lessonInfo)).toEqual('Invalid data passed');
  });

  it('should fail and emit a string', async () => {
    const lessonInfo: any = {
      category: '기타',
      title: 'hello',
      price: 30000,
      location: 'Seoul',
      minute_per_lesson: 23,
      content: false,
    };

    expect(await createLesson(2, lessonInfo)).toEqual('Invalid data passed');
  });

  it('should fail and emit a string', async () => {
    const lessonInfo: any = {
      category: '얼후',
      title: 'hello',
      price: 30000,
      location: 'Seoul',
      minute_per_lesson: 23,
      content: 'content',
    };

    expect(await createLesson(2, lessonInfo)).toEqual('invalid category name');
  });

  it('should fail and emit a string', async () => {
    const lessonInfo: any = {
      category: '기타',
      title: 'hello',
      price: 30000,
      location: 'Seoul',
      minute_per_lesson: 23,
      content: 'content',
    };

    expect(await createLesson(111103123, lessonInfo)).toEqual(
      'Invalid tutor id',
    );
  });
});
