import * as actions from './competition.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface Problem {
  id: string;
  text: string;
  image: string;
}

export interface Solution {
  id: number;
  solution: string;
}

export const competitionAdapter = createEntityAdapter<Problem>();
export interface State extends EntityState<Problem> {}

export const initialState: State = competitionAdapter.getInitialState();

export function competitionReducer(
  state: State = initialState,
  action: actions.CompetitionActions) {

  switch (action.type) {
    case actions.ADDED:
      return competitionAdapter.addOne(action.payload, state);

    case actions.MODIFIED:
      return competitionAdapter.updateOne({
        id: action.payload.id,
        changes: action.payload
      }, state);

    case actions.REMOVED:
      return competitionAdapter.removeOne(action.payload.id, state);

    default:
      return state;

  }
}

export const getCompetitionState = createFeatureSelector<State>('competition');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = competitionAdapter.getSelectors(getCompetitionState);
