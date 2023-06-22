import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
// import { DialogData } from '../schedule-interview/schedule-interview.component';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-Getcandidateprofile',
  templateUrl: './GetProfile.component.html',
  styleUrls: ['./GetProfile.component.css'],
  providers: [ApiService]
})
export class GetCandidateprofileComponent implements OnInit {
  
  customer: any;
  customerId: any;
  userId: any;
  profileview: any;
  profileId: any;
  list: any;
  otherSkills: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _service: ApiService, private router: Router) {
     this.profileId = sessionStorage.getItem('Preid');
  }

  ngOnInit() {
    this.GetUserProfileInfo();
  }

  Close()
  {
    this.router.navigateByUrl('login');
  }

  GetUserProfileInfo() {
    this._service.GetService('ProfileAPI/api/GetUserProfileInfo?profileId=', this.profileId).subscribe(
      datas => {
        this.profileview = datas;
        sessionStorage.removeItem('Preid');
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
