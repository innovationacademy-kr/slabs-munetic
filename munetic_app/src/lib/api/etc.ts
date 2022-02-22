import client from './client';

export const getTerms = () => client.get(`/etc/terms`);
export const getLicense = () => client.get(`/etc/license`);