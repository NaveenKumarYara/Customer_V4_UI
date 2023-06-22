import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    appName = "Tenendus";
    getYear = 2018;
}
