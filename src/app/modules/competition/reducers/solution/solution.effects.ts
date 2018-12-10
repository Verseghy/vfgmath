import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';

import * as solutionActions from './solution.actions';
import * as authActions from '../../../../reducers/auth/auth.actions';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Solution } from './solution.reducer';


@Injectable()
export class SolutionEffects {

  @Effect()
  query$: Observable<Action> = this.actions$.ofType(solutionActions.QUERY).pipe(
    switchMap(() => {
      console.log('getuser');
      this.store.dispatch(new authActions.GetUser());
      return this.store.pipe(
        select('auth'),
        map(data => {
          return data;
        })
      );
    }),
    switchMap(data => data),
    tap(data => {
      console.log('auth', data);
    }),
    switchMap(() => {
      return this.afs.collection<Solution>('problems').doc('svOhCuqixUKR6f9sNJ7c').collection('solutions').stateChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      console.log('action', action);
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
