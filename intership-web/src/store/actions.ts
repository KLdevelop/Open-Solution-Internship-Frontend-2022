export const SET_AUTH = 'SET_AUTH';
export const setAuth = (isLogin: boolean, login: null | string) => {
  return { type: SET_AUTH, payload: { isLogin, login } };
};
