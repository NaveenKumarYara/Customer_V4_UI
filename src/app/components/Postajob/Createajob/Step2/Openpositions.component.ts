import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators'
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-steps-step1-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})

export class JobdetailsComponent implements OnInit {  
  jobtitlelist: Observable<string[]>;
  selectedTitle: '';
  jobtitleloading = false;
  jobtitleinput = new Subject<string>();
  
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  private searchJobTitle() {
    this.jobtitlelist = concat(
      of([]), // default items
      this.jobtitleinput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.jobtitleloading = true),
        switchMap(term => this.appService.searchJobTitle(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.jobtitleloading = false)
        ))
      )
    );
  }

  ngOnInit() {
    this.searchJobTitle();
  }

}
