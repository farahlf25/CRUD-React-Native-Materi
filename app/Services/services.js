/* eslint-disable import/no-duplicates */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { get, post, put } from './networking';

// end point
export const endpoint = {
  login: async params => post('api/login', params),
  register: async params => post('api/register', params),
  getData: async page => get(`api/materi`, params)
};

// // end point
// export const endpoint = {
//   login: async params => post('api/users/v1/login/user', params)
// };

export default { endpoint };
