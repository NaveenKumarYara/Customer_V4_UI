import { Component, OnInit, Inject, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../app.service';
// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { Notification } from '../../../models/notifications';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {


  private subscription: Subscription;
  customer:any;
  userId:any;

  notifications: Observable<Notification[]>;
  notificationList: Notification[];


  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.userId = this.customer.UserId;

  }


  private getNotifications(userId) {
  
    return this.appService.getNotifications(this.userId).subscribe(res => {
      this.notificationList= res;
      //this.loaddata = true;
    });
  }



  ngOnInit() {
    this.getNotifications(this.userId);
  }

 

}
