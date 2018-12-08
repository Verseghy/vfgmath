import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import * as authActions from '../../../../reducers/auth/auth.actions';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.scss']
})
export class LoginscreenComponent implements OnInit {

  error: Observable<string>;

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
    this.error = this.store.pipe(
      select('auth'),
      filter(data => !data.loading && data.error),
      map(data => {
        return data.error;
      })
    );
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
