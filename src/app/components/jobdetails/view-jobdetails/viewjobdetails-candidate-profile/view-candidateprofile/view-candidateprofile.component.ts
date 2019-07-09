import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
// import { DialogData } from '../schedule-interview/schedule-interview.component';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-view-candidateprofile',
  templateUrl: './view-candidateprofile.component.html',
  styleUrls: ['./view-candidateprofile.component.css'],
  providers: [ApiService]
})
export class ViewCandidateprofileComponent implements OnInit {
  customer: any;
  customerId: any;
  userId: any;
  profileview: any;
  profileId: any;
  list: any;
  otherSkills: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: ApiService, private router: Router) {
    //this.preId = sessionStorage.getItem('Preid');
    this.profileId = JSON.parse(sessionStorage.getItem('Preid'));
  }

  ngOnInit() {
    this.GetUserProfileInfo();
  }
  GetUserProfileInfo() {
    this._service.GetService('ProfileAPI/api/GetUserProfileInfo?profileId=', this.data.ProfileId).subscribe(
      datas => {
        this.profileview = datas;
        debugger
        // this.profileview.ProfileBasicInfo.Email = this.profileview.ProfileBasicInfo.Email.contains('Esolvit') ? '' : this.profileview.ProfileBasicInfo.Email;
        this.list = datas.ProfileSkillset.filter(u => (u.ExpInYears > 0 || u.ExpInMonths > 0)
         && (u.ExpInYears != null && u.ExpInMonths != null));

        this.otherSkills = datas.ProfileSkillset.filter(u => (u.ExpInYears === 0 && u.ExpInMonths === 0)
          || (u.ExpInYears == null && u.ExpInMonths == null));

        }, error => {
        this._service.DebugMode(error);
      });
    }
    add3Dots(string, limit) {
      const dots = '...';
      if (string.length > limit) {
        string = string.substring(0, limit) + dots;
      }
        return string;
    }
}
