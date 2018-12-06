import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../../../../reducers/auth/auth.actions';
import * as timeActions from '../../../../reducers/time/time.actions';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.scss']
})
export class LoginscreenComponent implements OnInit {

  hide = false;

  loginForm = new FormGroup({
    username: new FormControl(
      {value: '', disabled: false}, [Validators.required]
    ),
    password: new FormControl(
      {value: '', disabled: false}, [Validators.required]
    )
  });

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private route: Router,
    private store: Store<any>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new timeActions.Query());
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(new authActions.Login({
        email: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value,
      }));
      this.loginForm.reset();
    }
  }

}
