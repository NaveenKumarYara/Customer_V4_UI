
import { Component, OnInit, Inject, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService, Employee } from '../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import * as introJs from 'intro.js/intro.js';
import DataSource from 'devextreme/data/data_source';
@Component({
  selector: 'app-customsearch',
  templateUrl: './customsearch.component.html',
  styleUrls: ['./customsearch.component.css']
})
export class CustomsearchComponent implements OnInit {
  dataSource: any;

  filterValue: Array<any>;

  customer:any;
  userId:any;

  introJS = introJs();
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.userId = this.customer.UserId;
      // this.introJS.setOptions({
      //   steps: [
      //     { 
      //       intro: "Hello world!"
      //     },
      //     {
      //       element: document.querySelector('#step1'),
      //       intro: "This is a tooltip."
      //     },
      //     {
      //       element: document.querySelectorAll('#step2')[0],
      //       intro: "Ok, wasn't that fun?",
      //       position: 'right'
      //     },
      //     {
      //       element: '#step3',
      //       intro: 'More features, more fun.',
      //       position: 'left'
      //     },
      //     {
      //       element: '#step4',
      //       intro: "Another step.",
      //       position: 'bottom'
      //     },
      //     {
      //       element: '#step5',
      //       intro: 'Get it, use it.'
      //     }
      //   ]
      // });

  }

  start()
  {
    this.introJS.start();
  }
  ngOnInit() {
    this.dataSource = new DataSource({
      store: this.appService.getEmployees(),
    });
    this.filterValue = ['City', '=', 'Bentonville'];
   
  }

}
