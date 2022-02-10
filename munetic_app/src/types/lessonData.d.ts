import { Gender } from './enums';

export interface LessonData {
  lesson_id: number;
  tutor_id: number;
  tutor_name: string;
  gender: Gender;
  birth: string;
  phone_number: string;
  image_url: string;
  editable: {
    category: string;
    title: string;
    price: number;
    location: string;
    minute_per_lesson: number;
    content: string;
  };
}

export interface LessonWriteData {
  title: string;
  category: string | undefined;
  price: number;
  location: string;
  minute_per_lesson: number;
  content: string;
}

export interface LessonBlockData {
  lesson_id: number;
  tutor_id: number;
  tutor_name: string;
  image_url: string;
  category: string;
  title: string | null;
  price: number | null;
  location: string | null;
  minute_per_lesson: number | null;
}