import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/settings/loader.service';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ApiService } from './shared/components/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Customer-app';
  menuOpen: boolean = false;
  public url: any;
  idleState = 'Not started.';
  timedOut = false;
  childModal: any;
  lastPing: Date | undefined;
  isLoading: Subject<boolean> = this.loader.isLoading;
  // typeSelected: string | undefined;
  
  constructor(private router: Router, private idle: Idle, private keepalive: Keepalive, private loader:LoaderService, private spinnerService:NgxSpinnerService, private _service:ApiService) { 
     idle.setIdle(environment.idleTimeOut);
     idle.setTimeout(environment.idleTimeOut);
   
     idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
 
     idle.onIdleEnd.subscribe(() => { 
      //  this.idleState = 'No longer idle.'
      //  console.log(this.idleState);
       this.reset();
     });
     
     idle.onTimeout.subscribe(() => {
      //  this.idleState = 'Timed out!';
       //console.log(this.idleState);
       this.timedOut = true;
       this._service.logout();
     });
     
    //  idle.onIdleStart.subscribe(() => {
    //      this.idleState = 'You\'ve gone idle!'
    //      console.log(this.idleState);
    //      this.childModal.show();
    //  });
     
      
    
     keepalive.interval(environment.idleTimeOut);
 
     keepalive.onPing.subscribe(() => this.lastPing = new Date());
 
     this.reset();

    //  this.typeSelected='circle';
    
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  public showSpinner(): void{
    this.spinnerService.show();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    })
  }

  openMenu(){
    this.menuOpen = !this.menuOpen;
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

}
