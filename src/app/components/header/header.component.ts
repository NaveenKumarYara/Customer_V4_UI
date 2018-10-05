import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'   
})
export class HeaderComponent {  
  appTitle = 'Tenendus';
  customer:any;
  profilePic:any;
  constructor( private router: Router) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
  }
  Logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/home' , { replaceUrl: true });
}
ngInit()
{
}
}
