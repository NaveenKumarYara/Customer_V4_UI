import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {
  active = 1;
  slickReinit:boolean = true;
  
  onNavChange(changeEvent: any) {
		if (changeEvent.nextId === 1) {
      this.reloadCurrentRoute();
    }
	}

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
