const initialState = {
  jwt: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_JWT_TOKEN':
      return {
        ...state,
        jwt: action.payload.jwt,
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
