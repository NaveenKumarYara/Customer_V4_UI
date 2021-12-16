import { Component, OnInit, Inject, OnDestroy, Output,ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd  } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { EmploymentType } from '../../../../../models/employmenttype.model';
import { SkillData, SkillDetails, SkillPostData } from '../../../../../models/skill.model';
// import { SalarysliderComponent } from './salaryslider.component';
import { Options, LabelType, ChangeContext, PointerType } from 'ng5-slider';
import { MatDialog } from '@angular/material';
import { UploadvideoprofileComponent } from '../Step3/uploadvideoprofile.component';
import { Salary } from '../../models/jobPostInfo';
// import { EventEmitter } from 'events';
import { EventEmitter } from '@angular/core';
@Component({
    selector: 'app-steps-step1-employmenttype',
    templateUrl: './employment.component.html'
})

export class StepEmploymentTypeComponent implements OnInit, OnDestroy {
    @Output() myEmploymentType = new EventEmitter();
    employmenttypelist: any;
    employmentTypeId: number;
    employmentType: EmploymentType;
    Remotework:boolean;
    disable:any;
    disableLoc = false;
    isDrafted: boolean;
    selectedskillinput = new Subject<string>();
    selectedData: SkillData;

  IsDomain:boolean=false;
    SkillDataList: SkillData[] = [];
    skillPostData: SkillPostData;
    skillPostDataList: SkillPostData[] = [];
    selectedSkillData: SkillData = new SkillData();
    Percentage: number;
    SkillName: string;
    skillId: number;
    domain:any;
    Skill_DATA: SkillDetails[] = [];
    Skill_DATAFiltered: SkillDetails[] = [];

    // salaryTypelist: any;
    // // salaryType = 1;
    // salaryTypeSelected: Salary;
    // minAnnualRate = 1000;
    // maxAnnualRate = 10000;
    // minHourRate = 20;
    // maxHourRate = 100;
    // // salaryTypeSelected: any;
    // annual: Options = {
    //   floor: 0,
    //   step: 500,
    //   ceil: 100500,
    //   translate: (value: number, label: LabelType): string => {
    //     switch (label) {
    //       case LabelType.Low:
    //         return '<b>Min pay:</b> $' + value;
    //       case LabelType.High:
    //         return '<b>Max pay:</b> $' + value;
    //       default:
    //         return '$' + value;
    //     }
    //   }
    // };
    // hourly: Options = {
    //   floor: 0,
    //   step: 10,
    //   ceil: 200,
    //   translate: (value: number, label: LabelType): string => {
    //     switch (label) {
    //       case LabelType.Low:
    //         return '<b>Min pay:</b> $' + value;
    //       case LabelType.High:
    //         return '<b>Max pay:</b> $' + value;
    //       default:
    //         return '$' + value;
    //     }
    //   }
    // };
    constructor(private route: ActivatedRoute, private toastr: ToastsManager,private _vcr:ViewContainerRef,
        private router: Router, private appService: AppService, private dialog: MatDialog) {// , private salaryRate: SalarysliderComponent
        this.employmentType = new EmploymentType();
        this.toastr.setRootViewContainerRef(_vcr);
        this.disable =  localStorage.getItem('Item');
    }




    populateEmploymentType() {
        this.appService.getEmploymentType().subscribe(res => {
            this.employmenttypelist = res.filter(x => x.EmploymentType);
        });
    }
    // selectSalaryType(val) {
    //   // this.employmentTypeId = val.employmentTypeId;
    //  // this.appService.updateEmploymentType(val);
    //    // this.salaryType = val === 'Annual' ? 2 : 1;
    //    this.salaryTypeSelected = val;
    //    this.appService.updatetSalaryType(this.salaryTypeSelected);
    // }
    selectEmpType(val) {
        // this.employmentTypeId = val.employmentTypeId;

        this.appService.updateEmploymentType(val);
        // if (val.EmploymentTypeId === 2) {
        this.myEmploymentType.emit(null);
        // }
        // else
        // this.salaryType = val.EmploymentTypeId;
    }

    selectType(val)
    {

            this.appService.RemoteWork=val;
       
    }

    OpenScheduleInterviewDialog() {
        // var candidateUserId = $("#candidateUserId").val();
        // var candidateId = +candidateUserId;
        const scheduleIntwdialogRef = this.dialog.open(UploadvideoprofileComponent,
            {
                width: '750',
                position: { right: '0px' },
                height: '750px',
                data: {
                    // jobResponseId: jobResponseId,
                    jobId: parseInt(localStorage.getItem('jobId'), 10),
                    // userId: userId
                    // status : this.statusid
                }
            }
        );
        scheduleIntwdialogRef.afterClosed().subscribe(result => {
            // this.jobDetails.populateJobsStaticInfo(this.jobid);
            // this.myEvent.emit(null);
            console.log('Chatbox Dialog result: ${result}');
        });
    }

    addSkill() {
        this.selectedSkillData = new SkillData();
        this.skillPostData = new SkillPostData();
        this.skillPostData.ParameerId = this.skillId;
        this.skillPostData.Percentage = this.Percentage;
        this.selectedSkillData.Name = this.SkillName;
        this.selectedSkillData.Percentage = this.Percentage;
        this.appService.addSkill(this.skillPostData, this.selectedSkillData);
        this.SkillDataList.push(this.selectedSkillData);
        this.Percentage = undefined;
        const selectedSkill = this.Skill_DATAFiltered.find(x => x.Id === this.skillId);
        const index = this.Skill_DATAFiltered.indexOf(selectedSkill);
        if(index > -1)  {
       this.Skill_DATAFiltered.splice(index, 1);
      }
    }

    onChange(newValue) {
        const selectedSkill = this.Skill_DATAFiltered.find(x => x.Id == newValue);
       
        if(selectedSkill){
            if(selectedSkill.Id==1 && this.domain.length==0)
            {
                this.IsDomain=true;
                this.toastr.error('You cannot select domain as matching parameter!', 'Oops!');
                setTimeout(() => {
                    this.toastr.dismissToast;
                }, 3000);
            }
            else{
        this.SkillName = selectedSkill.Parameter;
        this.skillId = selectedSkill.Id;
        this.IsDomain=false;
            }
    }else{
        this.Percentage =undefined;
    }
     
        
    }

    deleteSkill(index: number,skillName) {
        this.appService.deleteSkill(index);
        this.SkillDataList.splice(index, 1);
        this.Skill_DATAFiltered.push(this.Skill_DATA.find(x => x.Parameter === skillName));
    }
    // populateSalaryTypes() {
    //   this.appService.getSalaryType().subscribe(res => {
    //     this.salaryTypelist = res.filter(x => x.SalaryType);
    //   });
    //   // this.salaryTypelist = this.appService.getSalaryType();
    // }
    ngOnInit() {
        this.domain = this.appService.domain;
        this.Remotework=this.appService.RemoteWork;
        //debugger
        this.populateEmploymentType();

        this.appService.getSkillDetails()
            .subscribe(data => {
                this.Skill_DATA = data;
                this.Skill_DATAFiltered = data.map(x => Object.assign({}, x));
                console.log("Sadsadsadsa",this.appService.skillPostData);
                if(this.appService.skillDataList.length>0)
                {
                    this.skillPostDataList = this.appService.skillDataList;
                }else
                {
                this.skillPostDataList = this.appService.skillPostData;
                }
                this.SkillDataList = new Array<SkillData>();
                    this.skillPostDataList.forEach(temp => {
                        this.selectedSkillData = new SkillData();
                        this.selectedSkillData.Name = this.Skill_DATA.find(x => x.Id === temp.ParameerId).Parameter;
                        this.selectedSkillData.Percentage = temp.Percentage;
                        this.SkillDataList.push(this.selectedSkillData);
                        const skilData = this.Skill_DATAFiltered.find(x => x.Id === temp.ParameerId);
                        const index = this.Skill_DATAFiltered.indexOf(skilData);
                        if (index > -1)  {
                        this.Skill_DATAFiltered.splice(index, 1);
                    }
                    }); 
            });

        // this.populateSalaryTypes();
        //  if (localStorage.getItem('jobId') != null) {
        this.appService.currentEmploymentType.subscribe(x => this.employmentType = x);
        if (this.employmentType.EmploymentType === undefined) {
            this.employmentType = new EmploymentType();
            this.employmentType.EmploymentType = 'Full Time';
            this.employmentType.EmploymentTypeId = 1;
            this.selectEmpType(this.employmentType);
        }
        //  this.salaryType = this.employmentType.EmploymentTypeId === ( null || undefined) ? 1 : this.employmentType.EmploymentTypeId;
        // this.appService.currentSalaryTYpe.subscribe(x => this.salaryTypeSelected = x);
        // this.appService.currentMinRate.subscribe(x => this.minAnnualRate = x);
        //   this.appService.currentMaxRate.subscribe(x => this.maxAnnualRate = x);
        //   this.appService.currentMinHourlyRate.subscribe(x => this.minHourRate = x);
        //   this.appService.currentMaxHourlyRate.subscribe(x => this.maxHourRate = x);
        // }

             //Placed for Scroll to top on next step
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
    }
    //   minAnnualChangeStart(changeContext: ChangeContext): void {
    //     // this.logText += `minAnnualChangeStart(${this.getChangeContextString(changeContext)})\n`;
    //     this.minHourRate = this.minAnnualRate / 2000;
    //      this.appService.updateSalaryRange(this.minAnnualRate, this.maxAnnualRate,  this.salaryTypeSelected.SalaryTypeId  );

    //  }

    //  onAnnualChange(changeContext: ChangeContext): void {
    //    // this.logText += `onAnnualChange(${this.getChangeContextString(changeContext)})\n`;
    //  }

    //  maxAnnualChangeEnd(changeContext: ChangeContext): void {
    //   // this.logText += `maxAnnualChangeEnd(${this.getChangeContextString(changeContext)})\n`;
    //   this.maxHourRate = this.maxAnnualRate / 2000;
    //  this.appService.updateSalaryRange(this.minAnnualRate, this.maxAnnualRate , this.salaryTypeSelected.SalaryTypeId  );
    //  }

    //  minHourlyChangeStart(changeContext: ChangeContext): void {
    //   // this.logText += `minAnnualChangeStart(${this.getChangeContextString(changeContext)})\n`;
    //   this.minAnnualRate = this.minHourRate * 2000;
    //    this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate, this.salaryTypeSelected.SalaryTypeId  );
    // }

    // onHourlyChange(changeContext: ChangeContext): void {
    //  // this.logText += `onAnnualChange(${this.getChangeContextString(changeContext)})\n`;
    // }

    // maxHourlyChangeEnd(changeContext: ChangeContext): void {
    // // this.logText += `maxAnnualChangeEnd(${this.getChangeContextString(changeContext)})\n`;
    // this.maxAnnualRate = this.maxHourRate * 2000;
    // this.appService.updateSalaryRange(this.minHourRate, this.maxHourRate , this.salaryTypeSelected.SalaryTypeId  );
    // }

    //  getChangeContextString(changeContext: ChangeContext): string {
    //    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
    //           `value: ${changeContext.value}, ` +
    //           `highValue: ${changeContext.highValue}}`;
    //  }

    ngAfterViewChecked() {
        this.appService.currentDraft.subscribe(x => this.isDrafted = x);
        if(this.disable == "true")
        {
          this.disableLoc = false;
        }
        else 
        {
          this.disableLoc = (localStorage.getItem('EditMode') != null && this.isDrafted === false) ? true : false;
        }
       
      }

    ngOnDestroy() {
    }
}
