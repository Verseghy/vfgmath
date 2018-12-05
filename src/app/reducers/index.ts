import { ActionReducerMap } from '@ngrx/store';
import { competitionReducer } from '../modules/competition/reducers/competition.reducer';

export const reducers: ActionReducerMap<any> = {
  competition: competitionReducer
};
