import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Problem } from '../../reducers/problem/problem.reducer';
import { select, Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  @Input() problem: Problem;
  @ViewChild('solution') solution;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.pipe(
      select('competition'),
      filter(data => data),
      map(data => {
        return data.solution;
      }),
      map(data => {
        return data.entities[this.problem.id];
      }),
      filter(data => data),
      tap(data => {
        this.solution.value = data.solution;
      })
    ).subscribe();
  }

}
