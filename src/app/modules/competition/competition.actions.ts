import { Action } from '@ngrx/store';
import { Problem, Solution } from './competition.reducer';

export const QUERY = '[Competition] query competitions';

export const ADDED    = '[Competition] added';
export const MODIFIED = '[Competition] modified';
export const REMOVED  = '[Competition] removed';
export const UPDATE   = '[Competition] update';
export const SUCCESS  = '[Competition] update success';


export class Query implements Action {
  readonly type = QUERY;
  constructor () {}
}

export class Added implements Action {
  readonly type = ADDED;
  constructor (public payload: Problem) {}
}

export class Modified implements Action {
  readonly type = MODIFIED;
  constructor (public payload: Problem) {}
}

export class Removed implements Action {
  readonly type = REMOVED;
  constructor (public payload: Problem) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(
    public id: string,
    public changes: Partial<Solution>,
  ) { }
}

export class Success implements Action {
  readonly type = SUCCESS;
  constructor() {}
}

export type CompetitionActions =
  Query |
  Added |
  Modified |
  Removed |
  Update |
  Success;
