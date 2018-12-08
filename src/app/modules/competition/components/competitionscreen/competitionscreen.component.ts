import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as problemActions from '../../reducers/problem/problem.actions';
import * as authActions from '../../../../reducers/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-competitionscreen',
  templateUrl: './competitionscreen.component.html',
  styleUrls: ['./competitionscreen.component.scss']
})
export class CompetitionscreenComponent implements OnInit {

  problems: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.problems = this.store.select('competition').pipe(
      map(x => {
        return x.problem;
      })
    );
    this.store.dispatch(new problemActions.Query());
  }

  logoutHandler () {
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['/login']);
  }

}
