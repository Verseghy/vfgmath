import * as userActions from './auth.actions';

export interface User {
  uid: string;
  loading?: boolean;
  error?: string;
}

export type Action = userActions.AuthActions;

export function authReducer(state: User, action: Action) {
  switch (action.type) {

    case userActions.GET_USER:
      return { ...state, loading: true };

    case userActions.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };

    case userActions.NOT_AUTHENTICATED:
      return { ...state, loading: false };

    case userActions.LOGIN:
      return { ...state, loading: true };

    case userActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };

    case userActions.LOGOUT:
      return { ...state, loading: true };

  }
}

