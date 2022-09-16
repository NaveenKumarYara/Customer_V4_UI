
import { Component, OnInit, Inject, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService, Employee } from '../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
@Component({
  selector: 'app-customsearch',
  templateUrl: './customsearch.component.html',
  styleUrls: ['./customsearch.component.css']
})
export class CustomsearchComponent implements OnInit {
  employees: Employee[];

  showFilterRow: boolean;
  customer:any;
  userId:any;


  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.userId = this.customer.UserId;

  }

  ngOnInit() {
    this.employees = this.appService.getEmployees();
    this.showFilterRow = true;
  }

}
