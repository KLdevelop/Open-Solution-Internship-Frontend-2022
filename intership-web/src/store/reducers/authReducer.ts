export const SET_AUTH = 'SET_AUTH';

interface LoginState {
  isLogin: boolean;
  user: null | string;
}

interface AuthAction {
  type: string;
  payload: LoginState;
}

const initialState: LoginState = {
  isLogin: false,
  user: null,
};

const someAction: AuthAction = {
  type: '',
  payload: initialState,
};

export const authReducer = (state = initialState, action: AuthAction = someAction) => {
  if (action.type === SET_AUTH) return { ...state, ...action.payload };
  return state;
};
