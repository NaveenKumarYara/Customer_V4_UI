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
import { MatDialog } from '@angular/material';
declare var $: any;
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
  notificationList: Notification[] = [];


  constructor(private route: ActivatedRoute,private dialog: MatDialog , 
    private router: Router, private appService: AppService) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.userId = this.customer.UserId;
      this.getNotifications();
  }

  CheckSearch()
  {
    this.router.navigateByUrl('app-customsearch');
  }

  Shareclose() {
    this.router.navigateByUrl('/app-dashboardview');
}


getNotifications() {
  
    return this.appService.getNotifications(this.userId).subscribe(res => {
      this.notificationList= res;
      //this.loaddata = true;
    });
  }

  ViewJobdetails(jobId) {
   this.reload();
   localStorage.removeItem('jobactive');
   localStorage.removeItem('jobId');
    $("#activeMyjob").addClass('active');
    let jobactive= true;
    // $("#notification").Modal('hide');
    this.dialog.closeAll();
    
    localStorage.setItem('jobactive', JSON.stringify(jobactive));
    localStorage.setItem('jId', JSON.stringify(jobId));
    this.router.navigateByUrl('app-view-jobdetails');
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }


  ngOnInit() {

  }

 

}
