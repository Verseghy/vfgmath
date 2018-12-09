import { Component, Input, OnInit } from '@angular/core';
import { Problem } from '../../reducers/problem/problem.reducer';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  @Input() problem: Problem;

  constructor() { }

  ngOnInit() {
  }

}
