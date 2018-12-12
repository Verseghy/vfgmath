import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as problemActions from '../../reducers/problem/problem.actions';
import * as authActions from '../../../../reducers/auth/auth.actions';
import * as solutionActions from '../../reducers/solution/solution.actions';
import { Store } from '@ngrx/store';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinct, map, tap } from 'rxjs/operators';
import { KeyValue } from '@angular/common';

declare var MathJax: any;

@Component({
  selector: 'app-competitionscreen',
  templateUrl: './competitionscreen.component.html',
  styleUrls: ['./competitionscreen.component.scss']
})
export class CompetitionscreenComponent implements OnInit {

  problems: Observable<any>;
  solutions: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private store: Store<any>,
  ) { }

  ngOnInit() {
    this.problems = this.store.select('competition').pipe(
      map(x => {
        return x.problem;
      })
    );
    this.store.dispatch(new problemActions.Query());
    this.problems.subscribe(x => {
      if (x.ids.length >= 40) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
      }
    });

    fromEvent(document, 'scroll').pipe(
      debounceTime(200),
      distinct(),
      tap(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
      })
    ).subscribe();

    this.store.dispatch(new solutionActions.Query());
  }

  logoutHandler () {
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['/login']);
  }

  comparator(a: KeyValue<any, any>, b: KeyValue<any, any>) {
    if (a.value.id === b.value.id) {
      return 0;
    }
    return a.value.id < b.value.id ? -1 : 1;
  }

}
