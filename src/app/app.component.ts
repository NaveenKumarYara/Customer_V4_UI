import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'arytic-app';
  menuOpen: boolean = false;
  public url: any;
  
  constructor(private router: Router) { 
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
