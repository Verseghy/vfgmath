import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';

import * as competitionActions from './competition.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Problem } from './competition.reducer';


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
        type: `[Problem] ${action.type}`,
        payload: {
          id: action.payload.doc.id,
          ...action.payload.doc.data()
        }
      };
    })
  );

  constructor(private actions$: Actions, private afs: AngularFirestore) { }
}
