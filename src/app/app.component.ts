import {Keepalive} from '@ng-idle/keepalive';
import {EventTargetInterruptSource,DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Component, ElementRef} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { AppService } from './app.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  items: string[];
  constructor(private route: Router,private appService: AppService,private element: ElementRef, private idle: Idle, private keepalive: Keepalive) {
    this.items = [];
    this.populateItems();
    let idleState = 'Not started.';
    let timedOut = false;
    let lastPing: Date = null;
    
    idle.setIdle(1);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(1);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    // sessionStorage.clear();
    // this.route.navigateByUrl('/');
    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      sessionStorage.removeItem('userData');
      sessionStorage.clear();
      this.route.navigateByUrl('/login' , { replaceUrl: true });
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
    // sets the ping interval to 15 seconds
    keepalive.interval(15);
    keepalive.onPing.subscribe(() => {
      // sessionStorage.removeItem('userData');
      // sessionStorage.clear();
      // this.route.navigateByUrl('/');
      this.lastPing = new Date();
    });
    $('html').click(function () {
      // this.restart();
      idle.watch();
      idleState = 'Started.';
      timedOut = false;
    });
    // this.reset();


   
    }

    populateItems() {
      this.appService.getDashboarddata().subscribe(res => {
        this.items = res;
      });
    }  
}
