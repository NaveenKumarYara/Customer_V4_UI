import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/components/services/api.service';
import { ScheduleType } from 'src/app/shared/models/ScheduleType';
import { RecruitingTeam } from 'src/app/shared/models/RecruitingTeam';
import { Router } from '@angular/router';
@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.scss']
})
export class ScheduleInterviewComponent implements OnInit {
  @Input() panelTitle = '';
  @Input() panelShow = '';
  typeList?: ScheduleType[];
  teamlist?:RecruitingTeam[];

  @Output() panelCloseHandler = new EventEmitter<string>();
  router: any;

  constructor(
    // private jobdetailsservice: JobdetailsService, 
    private jobApi:ApiService,
    private route:Router,
    private profileApi:ApiService
  ) { }

  ngOnInit(): void {
    this.GetInterView();
    //this.Recrutingteam();
    
  }
  onBtnClick(){
    this.route.navigate(['schedule-interview-external']);
  }
  closePanel() {
    this.panelCloseHandler.emit();
  }
  GetInterView() {
    let getInterviewTypeUrl='/api/GetInterviewType';
    this.jobApi.getJobApi(getInterviewTypeUrl).subscribe((res: any) => {
      // debugger;
      this.typeList = res;
    });
  }
  Recrutingteam() {
    let getRecrutingteamUrl='/api/GetRecruitingTeamList';
    this.profileApi.getProfileApi(getRecrutingteamUrl).subscribe((res: any) => {
      // debugger;
      this.teamlist = res;
    });

  }




  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  panelHandler(name: string) {
    this.panelShow = name;
  }
  Job: any = [];
}
