import * as actions from './competition.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface Problem {
  id: string;
  text: string;
  image: string;
}

export const problemsAdapter = createEntityAdapter<Problem>();
export interface State extends EntityState<Problem> {}

export const initialState: State = problemsAdapter.getInitialState();

export function competitionReducer(
  state: State = initialState,
  action: actions.ProblemActions) {

  switch (action.type) {
    case actions.ADDED:
      return problemsAdapter.addOne(action.payload, state);

    case actions.MODIFIED:
      return problemsAdapter.updateOne({
        id: action.payload.id,
        changes: action.payload
      }, state);

    case actions.REMOVED:
      return problemsAdapter.removeOne(action.payload.id, state);

    default:
      return state;

  }
}

export const getCompetitionState = createFeatureSelector<State>('problems');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = problemsAdapter.getSelectors(getCompetitionState);
