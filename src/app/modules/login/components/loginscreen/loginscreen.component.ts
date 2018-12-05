import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../../../../reducers/auth/auth.actions';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.scss']
})
export class LoginscreenComponent implements OnInit {

  hide = true;

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
    this.afStore.collection('info').doc('info').get().subscribe(x => {
      if (x.data()['startdate'].toDate().getTime() > new Date().getTime()) {
        this.route.navigate(['/home']);
      } else if (x.data()['enddate'].toDate().getTime() < new Date().getTime()) {
        this.route.navigate(['/after']);
      } else {
        this.hide = false;
      }
    });
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
