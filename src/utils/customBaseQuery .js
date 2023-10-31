import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { apiBaseURL } from '../constants/API';

export const customBaseQuery = (args) => {
  return fetchBaseQuery({
    ...args,
    baseUrl: `${apiBaseURL}${args.baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { jwToken } = getState().userSession.sessionObj;
      if (jwToken) {
        headers.set('authorization', `Bearer ${jwToken}`);
      }
      return headers;
    },
  });
};
