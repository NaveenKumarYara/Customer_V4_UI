import { Component, OnInit, Input } from '@angular/core';
import { RecentApplicants } from '../../../../models/recentapplicants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-recent-applications',
  templateUrl: './dashboard-recent-applications.component.html',
  styleUrls: ['./dashboard-recent-applications.component.css']
})
export class DashboardRecentApplicationsComponent implements OnInit {
    @Input() recentapplicantlist: any;

    constructor(private router: Router) {
     }
  add3Dots(string, limit) {
    const dots = '...';
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
      return string;
  }

  GetRedirect(jobId,profileId)  {
   sessionStorage.setItem('jobId', JSON.stringify(jobId));
   localStorage.setItem('rprofileId', JSON.stringify(profileId));;
   this.router.navigateByUrl('app-view-jobdetails');
   let candidateProfile = this.recentapplicantlist.find(item => item.ProfileId === profileId);
   sessionStorage.setItem("selectedProfile", JSON.stringify(candidateProfile));
     }

  ngOnInit() {
  }

}
