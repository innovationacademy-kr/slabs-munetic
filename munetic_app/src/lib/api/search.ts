import client from './client';

export const searchLessonsByTitle = (category: string | undefined, title: string | undefined) => 
    client.get(`/search/title/?category=${category}&title=${title}`);

export const searchLessonsByTutor = (category: string | undefined, tutor: string | undefined) => 
    client.get(`/search/tutor/?category=${category}&tutor=${tutor}`);
