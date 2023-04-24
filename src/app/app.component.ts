import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'arytic-app';
  menuOpen: boolean = false;

  constructor(
    private router: Router,
  ) {}

  openMenu(){
    this.menuOpen = !this.menuOpen;
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
