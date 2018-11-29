import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.scss']
})
export class LoginscreenComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(
      { value: '', disabled: false }, [Validators.required]
    ),
    password: new FormControl(
      { value: '', disabled: false}, [Validators.required]
    )
  });

  constructor(
    private afAuth: AngularFireAuth,
    private route: Router
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(x => {
      if (x) {
        this.route.navigate(['test']);
      }
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(
        this.loginForm.controls['username'].value,
        this.loginForm.controls['password'].value
      );
      this.loginForm.reset();
    }
  }

}
