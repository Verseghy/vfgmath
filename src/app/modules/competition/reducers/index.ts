import { ActionReducerMap } from '@ngrx/store';
import { problemReducer } from './problem/problem.reducer';

export const competitionReducers: ActionReducerMap<any> = {
  problem: problemReducer
};
