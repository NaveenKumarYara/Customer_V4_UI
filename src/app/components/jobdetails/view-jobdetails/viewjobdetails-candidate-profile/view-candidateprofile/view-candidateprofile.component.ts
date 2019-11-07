import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../../shared/services/api.service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ChartsModule } from 'ng2-charts';
declare var $: any;

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
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 0.8,
    height: 400,
    overflow: false,
    realignOnResize: true,
  };

  skilllist: CloudData[];

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700,200], label: 'Account A' },
  ];

  chartLabels = ['Openess to Experience', 'Conscientiousness', 'Extraversion', 'Agreeableness','Neuroticism'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: ApiService, private router: Router) {
    //this.preId = sessionStorage.getItem('Preid');

    this.profileId = JSON.parse(sessionStorage.getItem('Preid'));
  }

  ngOnInit() {
    function cloudspan() {
      setTimeout(cloudAttr, 3000);
    }
    
    function cloudAttr() {

      $( ".word-cloud angular-tag-cloud span" ).each(function() {
        $( this ).addClass("tooltip1")
        // $('<div class="tooltip fade top in">'+$( this ).text()+'</div>').appendTo( this );
        $('<div class="tooltip fade bottom hover-active"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+$( this ).text()+'</div></div>').appendTo( this );
      });




    }
    cloudspan();
    this.GetCandidateSKills();
    this.GetUserProfileInfo();
  }

  onChartClick(event) {
    console.log(event);
  }

  GetCandidateSKills()
  {
    this._service.GetService('ProfileAPI/api/GetCandidatePrimarySkill?profileId=', this.data.ProfileId).subscribe(
      data => {
        this.skilllist = data;
      })
  }

  GetUserProfileInfo() {
    this._service.GetService('ProfileAPI/api/GetUserProfileInfo?profileId=', this.data.ProfileId).subscribe(
      datas => {
        this.profileview = datas;
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
