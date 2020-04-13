import {AsyncStorage} from 'react-native';

import {userLogin, userRefreshToken} from '../api/auth';

const storeJwtToStorage = async (token) => {
  await AsyncStorage.setItem('token', token);
};

const destroyJwtFromStorage = async () => {
  await AsyncStorage.removeItem('token');
};

export const login = (email, password) => {
  return (dispatch) => {
    userLogin({email, password}).then((res) => {
      storeJwtToStorage(res.data.access_token);
      dispatch({
        type: 'SET_JWT_TOKEN',
        payload: {
          jwt: res.data.access_token,
        },
      });
    });
  };
};

export const refreshJwtToken = (jwt) => {
  return (dispatch) => {
    userRefreshToken(jwt)
      .then((res) => {
        storeJwtToStorage(res.data.access_token);
        dispatch({
          type: 'SET_JWT_TOKEN',
          payload: {
            jwt: res.data.access_token,
          },
        });
      })
      .catch((e) => {
        //
      });
  };
};

export const logout = () => {
  destroyJwtFromStorage();
  return {
    type: 'DESTOROY_TOKEN',
  };
};
