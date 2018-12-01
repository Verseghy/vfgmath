import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registerteam',
  templateUrl: './registerteam.component.html',
  styleUrls: ['./registerteam.component.scss']
})
export class RegisterteamComponent implements OnInit {

  teamForm: FormGroup;
  members = [];

  constructor(
    private fb: FormBuilder,
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.teamForm = this.fb.group({
      teamname: this.fb.control({
        value: null, disabled: false
      }),
      members: this.fb.array([
        this.fb.group({
          email: this.fb.control({
            value: null, disabled: false
          }),
          name: this.fb.control({
            value: null, disabled: false
          })
        })
      ])
    });
    this.members = (<FormArray>this.teamForm.get('members')).controls;
  }

  onChange() {
    // Check if the form has empty fields, if so delete them
    for (const index of Object.keys((<FormArray>this.teamForm.controls.members).controls)) {
      const indexnumber = Number(index);
      const member = <FormGroup>(<FormArray>this.teamForm.controls.members).controls[indexnumber];

      if (
        indexnumber !==  (<FormArray>this.teamForm.controls.members).length - 1 &&
        member.controls.email.value === null && member.controls.name.value == null
      ) {
        (<FormArray>this.teamForm.controls.members).removeAt(indexnumber);
        break;
      }

    }

    // If the last fields are not empty append another one to the end
    if (
        (<FormGroup>
          (<FormArray>this.teamForm.controls.members
        ).controls[(<FormArray>this.teamForm.controls.members).length - 1]
        ).controls.email.value !== null &&
        (<FormGroup>
          (<FormArray>this.teamForm.controls.members
        ).controls[(<FormArray>this.teamForm.controls.members).length - 1]
        ).controls.name.value !== null
    ) {
      const formarray = <FormArray>(this.teamForm.controls.members);
      formarray.push(
        this.fb.group({
          email: this.fb.control({
            value: null, disabled: false
          }),
          name: this.fb.control({
            value: null, disabled: false
          })
        })
      );
    }
  }

  async onSubmit() {
    for (const index of Object.keys((<FormArray>this.teamForm.controls.members).controls)) {
      const indexnumber = Number(index);
      const member = <FormGroup>(<FormArray>this.teamForm.controls.members).controls[indexnumber];

      if (member.controls.email.value) {
        await this.afAuth.auth.createUserWithEmailAndPassword(member.controls.email.value, Math.random().toString(36).substring(4));
        await this.afAuth.auth.sendPasswordResetEmail(member.controls.email.value);
        await this.afAuth.auth.signOut();
      }

    }
  }

}
