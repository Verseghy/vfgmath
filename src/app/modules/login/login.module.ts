import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginscreenComponent } from './components/loginscreen/loginscreen.component';
import { Routes, RouterModule } from '@angular/router';

import { MdcTextFieldModule, MdcFormFieldModule, MdcButtonModule } from '@angular-mdc/web';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LoginscreenComponent
  }
]

@NgModule({
  declarations: [LoginscreenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MdcTextFieldModule,
    MdcFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MdcButtonModule,
    AngularFireAuthModule
  ]
})
export class LoginModule { }
