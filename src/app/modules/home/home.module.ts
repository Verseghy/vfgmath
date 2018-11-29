import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { Routes, RouterModule } from '@angular/router';

import { MdcTypographyModule } from '@angular-mdc/web';

const routes: Routes = [
  {
    path: '',
    component: HomescreenComponent,
  }
];

@NgModule({
  declarations: [HomescreenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MdcTypographyModule,
    AngularFirestoreModule
  ]
})
export class HomeModule { }
