// db 초기화 후 seed를 집어 넣은 상태에서 테스트를 해야합니다.

import { deepEqual, equal } from 'assert';
import {
  createLesson,
  editLesson,
  findLesson,
  findLessons,
  LessonEditable,
  removeLesson,
} from '../../service/lesson.service';
import * as seeds from './lessonseeds';

const lessonInput1: LessonEditable = {
  category: '기타',
  title: '어쩌라고',
};

const lessonInput2: LessonEditable = {
  category: '피아노',
  title: '사실',
  price: 100,
  location: '서울',
  minute_per_lesson: 30,
  content: '거짓말임',
};

const lesson4 = {
  lesson_id: 4,
  tutor_id: 1,
  title: '어쩌라고',
  price: null,
  location: null,
  minute_per_lesson: null,
  content: null,
  Category: {
    name: '기타',
  },
  User: seeds.user1,
};

export function lessonTest() {
  setTimeout(async () => {
    try {
      {
        let res = await createLesson(1, lessonInput1);
        const expected = lesson4;
        res = JSON.parse(JSON.stringify(res));
        console.log('createLesson test1.');
        console.log('deepEqual:', deepEqual(expected, res));
      }
      {
        let res = await createLesson(1, lessonInput2);
        const expected = {
          lesson_id: 5,
          tutor_id: 1,
          title: '사실',
          price: 100,
          location: '서울',
          minute_per_lesson: 30,
          content: '거짓말임',
          Category: {
            name: '피아노',
          },
          User: seeds.user1,
        };
        res = JSON.parse(JSON.stringify(res));
        console.log('createLesson test2.');
        console.log('deepEqual:', deepEqual(expected, res));
      }
      {
        const res = await createLesson(111231241233, lessonInput1);
        const expected = '해당하는 튜터가 없습니다.';
        console.log('createLesson test3.');
        console.log('equal: ', equal(expected, res));
      }
      {
        let res = await createLesson(1, { title: 'asdf', category: '얼후' });
        const expected = '해당하는 카테고리 이름이 없습니다.';
        console.log('createLesson test4.');
        console.log('equal', equal(expected, res));
      }

      {
        let res = await findLesson(1);
        const expected = {
          lesson_id: 1,
          tutor_id: 2,
          title: '지금까지 이런 기타 레슨은 없었다.',
          price: 100000,
          location: '서울시',
          minute_per_lesson: 60,
          content: '더 이상 설명이 필요 없습니다. 믿고 따라오세요.',
          Category: {
            name: '기타',
          },
          User: seeds.user2,
        };
        res = JSON.parse(JSON.stringify(res));
        console.log('findLesson test1.');
        console.log('deepEqual:', deepEqual(expected, res));
      }
      {
        const res = await findLesson(2342342234234);
        const expected = '해당하는 레슨이 없습니다.';
        console.log('findLesson test2.');
        console.log('equal:', equal(expected, res));
      }

      {
        let res = await editLesson(4, {
          price: 60,
          minute_per_lesson: 20000,
        });
        res = JSON.parse(JSON.stringify(res));
        const expected = { ...lesson4, price: 60, minute_per_lesson: 20000 };
        console.log('editLesson test1.');
        console.log('deepEqual', deepEqual(expected, res));
      }
      {
        const res = await editLesson(4, {
          category: '얼후',
        });
        const expected = '해당하는 카테고리 이름이 없습니다.';
        console.log('editLesson test2.');
        console.log('equal:', equal(expected, res));
      }
      {
        const res = await editLesson(242342234243, lessonInput2);
        const expected = '해당하는 레슨이 없습니다.';
        console.log('editLesson test3.');
        console.log('equal:', equal(expected, res));
      }

      {
        const res = await removeLesson(4);
        const expected = { removed: true };
        console.log('removeLesson test1.');
        console.log('deepEqual:', deepEqual(expected, res));
      }
      {
        const res = await removeLesson(4);
        const expected = '해당하는 레슨이 없습니다.';
        console.log('removeLesson test2.');
        console.log('deepEqual:', deepEqual(expected, res));
      }

      {
        const res = await findLessons(0, 0);
        const expected: void[] = [];
        console.log('findLessons test1.');
        console.log('deepEqual:', deepEqual(expected, res));
      }
      {
        const res_raw = await findLessons(1, 1);
        const res = [];
        const expected = [seeds.lesson2];
        for (const lesson of res_raw) {
          res.push(JSON.parse(JSON.stringify(lesson)));
        }
        console.log('findLessons test2.');
        console.log('deepEqual:', deepEqual(expected, res));
      }
      {
        const res_raw = await findLessons(0, 3);
        const res = [];
        for (const lesson of res_raw) {
          res.push(JSON.parse(JSON.stringify(lesson)));
        }
        const expected = [seeds.lesson1, seeds.lesson2, seeds.lesson3];
        console.log('findLessons test3.');
        console.log('deepEqual:', deepEqual(expected, res));
      }
      {
        const res = await findLessons(2, -1);
        const expected = 'offset이나 limit 값으로 음수가 올 수 없습니다.';
        console.log('findLessons test4.');
        console.log('equal:', equal(expected, res));
      }
      {
        const res = await findLessons(12341, 234234);
        const expected: void[] = [];
        console.log('findLessons test4.');
        console.log('equal:', deepEqual(expected, res));
      }
    } catch (e) {
      console.log(e);
    }
  }, 5000);
}
