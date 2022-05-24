import client from './client';


export const searchLessonsByInstrument = (instrument: string | undefined) => 
    client.get(`/search/instrument/?instrument=${instrument}`);

export const searchLessonsByTutor = (tutor: string | undefined) => 
    client.get(`/search/tutor/?tutor=${tutor}`);

export const searchLessonsByLocation = (location: string | undefined) => 
    client.get(`/search/location/?location=${location}`);

export const searchLessonsMix = (
    instrument: string | undefined,
    tutor: string | undefined,
    location: string | undefined,
    ) => 
    client.get(`/search/mix-filter/?instrument=${instrument}&tutor=${tutor}&location=${location}`);
    
    