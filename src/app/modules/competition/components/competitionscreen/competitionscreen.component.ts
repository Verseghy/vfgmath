import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../reducers/competition.actions';
import * as fromProblem from '../../reducers/competition.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-competitionscreen',
  templateUrl: './competitionscreen.component.html',
  styleUrls: ['./competitionscreen.component.scss']
})
export class CompetitionscreenComponent implements OnInit {

  hide = true;
  problems: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private store: Store<fromProblem.State>
  ) { }

  ngOnInit() {
    this.afStore.collection('info').doc('info').get().subscribe(x => {
      if (x.data()['startdate'].toDate().getTime() > new Date().getTime()) {
        this.router.navigate(['/home']);
      } else if (x.data()['enddate'].toDate().getTime() < new Date().getTime()) {
        this.router.navigate(['/after']);
      } else {
        this.hide = false;
      }
    });

    this.afAuth.authState.subscribe(x => {
      if (!x) {
        this.router.navigate(['/login']);
      }
    });

    this.problems = this.store.select('problems').pipe(
      map(x => {
        console.log(x.entities);
        return x;
      })
    );
    this.store.dispatch(  new actions.Query() );
  }

}
