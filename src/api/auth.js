import axios from 'axios';
import Config from 'react-native-config';

export const getCurrentUser = (jwt) => {
  return axios.get(`${Config.API_ROOT}/user/users/`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const userLogin = (payload) => {
  const {email, password} = payload;
  return axios.post(`${Config.API_ROOT}/user/auth/login`, {
    email,
    password,
  });
};

export const userRefreshToken = (jwt) => {
  return axios.get(`${Config.API_ROOT}/user/auth/refresh`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
