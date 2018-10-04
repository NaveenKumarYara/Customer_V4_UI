import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'   
})
export class HeaderComponent {  
  appTitle = 'Tenendus';
  constructor( private router: Router) {

  }
  Logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/home' , { replaceUrl: true });
}
ngInit()
{
  
}
}
