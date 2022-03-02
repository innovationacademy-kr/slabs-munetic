import client from './client';


export const searchLessonsByInstrument = (instrument: string | undefined) => 
    client.get(`/search/instrument/?instrument=${instrument}`);

export const searchLessonsByTutor = (tutor: string | undefined) => 
    client.get(`/search/tutor/?tutor=${tutor}`);

export const searchLessonsByLocation = (location: string | undefined) => 
    client.get(`/search/location/?location=${location}`);