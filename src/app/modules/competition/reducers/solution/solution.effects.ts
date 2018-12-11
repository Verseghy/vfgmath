import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';

import * as solutionActions from './solution.actions';
import * as authActions from '../../../../reducers/auth/auth.actions';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class SolutionEffects {

  @Effect()
  query$: Observable<Action> = this.actions$.ofType(solutionActions.QUERY).pipe(
    switchMap(() => {
      this.store.dispatch(new authActions.GetUser());
      return this.store.pipe(
        select('auth'),
        filter(data => data),
        filter(data => !data.loading),
        map(data => {
          return of(data);
        })
      );
    }),
    switchMap(data => data),
    switchMap((user) => {
      return this.afs.collection('teams').doc(user.uid).collection('solutions').stateChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      return {
        type: `[Solution] ${action.type}`,
        payload: {
          id: action.payload.doc.id,
          ...action.payload.doc.data()
        }
      };
    })
  );

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private store: Store<any>
  ) {}
}
