import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-competitionscreen',
  templateUrl: './competitionscreen.component.html',
  styleUrls: ['./competitionscreen.component.scss']
})
export class CompetitionscreenComponent implements OnInit {

  hide = true;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.afStore.collection('info').doc('info').get().subscribe(x => {
      if (x.data()['startdate'].toDate().getTime() > new Date().getTime()) {
        this.router.navigate(['/home']);
      } else if (x.data()['enddate'].toDate().getTime() < new Date().getTime()) {
        this.router.navigate(['/after']);
      } else {
        this.hide = false;
      }
    });

    this.afAuth.authState.subscribe(x => {
      if (!x) {
        this.router.navigate(['/login']);
      } else {
        console.log(x);
      }
    });


  }

}
