import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';

import * as competitionActions from './competition.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Problem, Solution } from './competition.reducer';


@Injectable()
export class CompetitionEffects {

  @Effect()
  query$: Observable<Action> = this.actions$.ofType(competitionActions.QUERY).pipe(
    switchMap(() => {
      return this.afs.collection<Problem>('problems').stateChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      return {
        type: `[Competition] ${action.type}`,
        payload: {
          id: action.payload.doc.id,
          ...action.payload.doc.data()
        }
      };
    })
  );

  @Effect()
  update$: Observable<Action> = this.actions$.ofType(competitionActions.UPDATE).pipe(
    map((action: competitionActions.Update) => action),
    switchMap(data => {
      const teamid = 'svOhCuqixUKR6f9sNJ7c'; // TODO GET TEAMID WITH AUTH
      const ref = this.afs.doc<Solution>(`teams/${teamid}/solutions/$(data.id)`);
      return from(ref.update(data.changes));
    }),
    map(() => new competitionActions.Success())
  );

  constructor(private actions$: Actions, private afs: AngularFirestore) { }
}
