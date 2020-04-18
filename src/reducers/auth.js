const initialState = {
  jwt: null,
  attendances: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_JWT_TOKEN':
      return {
        ...state,
        jwt: action.payload.jwt,
      };
    case 'SET_MY_ATTENDANCES':
      return {
        ...state,
        attendances: action.payload.attendances,
      };
    case 'DESTOROY_TOKEN':
      return {
        ...state,
        jwt: null,
      };
    default:
      return state;
  }
};

export default auth;
