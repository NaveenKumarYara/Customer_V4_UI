import { Component, OnInit ,Input} from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cprofile',
  templateUrl: './cprofile.component.html',
  styleUrls: ['./cprofile.component.css']
})
export class CandidateProfileComponent implements OnInit {
  customer:any;
  customerId: any;
  userId:any;
  profileview:any;
  profileId:any;
  list:any;
  otherSkills: any = [];
  constructor(private _service: ApiService,private router: Router) {
      this.profileId = JSON.parse(sessionStorage.getItem('profileId'));
    }


  ngOnInit() {
    this.GetUserProfileInfo();
  }
  GetUserProfileInfo() {
		this._service.GetService('ProfileAPI/api/GetUserProfileInfo?profileId=', this.profileId)
			.subscribe(
			data => {
        this.profileview = data;
        this.profileview.ProfileBasicInfo.Email = this.profileview.ProfileBasicInfo.Email.contains('Esolvit') ? '' : this.profileview.ProfileBasicInfo.Email;
        this.list = data.ProfileSkillset.filter(u => (u.ExpInYears > 0 || u.ExpInMonths > 0)
        && (u.ExpInYears != null && u.ExpInMonths != null));
        this.otherSkills =
        data.ProfileSkillset.filter(u => (u.ExpInYears === 0 && u.ExpInMonths === 0)
          || (u.ExpInYears == null && u.ExpInMonths == null));
			}, error => {
				this._service.DebugMode(error);
			});
	}

}
