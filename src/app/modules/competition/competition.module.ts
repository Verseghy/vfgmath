import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionscreenComponent } from './components/competitionscreen/competitionscreen.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule, Routes } from '@angular/router';
import { ProblemComponent } from './components/problem/problem.component';

const routes: Routes = [
  {
    path: '',
    component: CompetitionscreenComponent
  }
];

@NgModule({
  declarations: [CompetitionscreenComponent, ProblemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule,
    AngularFirestoreModule
  ]
})
export class CompetitionModule { }
