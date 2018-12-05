import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';

export const reducers: ActionReducerMap<any> = {
  auth: authReducer,
};
