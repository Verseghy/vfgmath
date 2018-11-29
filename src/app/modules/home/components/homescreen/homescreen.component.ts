import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { format } from 'date-fns/esm';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit {

  time: string;

  constructor(
    private afStore: AngularFirestore,
    private route: Router
  ) { }

  ngOnInit() {
    this.afStore.collection('info').doc('info').get().subscribe(x => {
      if (x.data()['startdate'].toDate().getTime() > new Date().getTime()) {
        interval(1000).subscribe(() => {
          const date = new Date(x.data()['startdate'].toDate().getTime() - new Date().getTime());
          this.time = format(date, 'dd') + ' nap ' + format(date, 'hh:mm:ss');
          if (x.data()['startdate'].toDate().getTime() < new Date().getTime()) {
            this.route.navigate(['/login']);
          }
        });
      } else {
        this.route.navigate(['/login']);
      }
    });
  }

}
