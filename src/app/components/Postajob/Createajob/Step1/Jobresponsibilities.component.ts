import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { RoleModel, Roles } from '../../models/jobPostInfo';
// import { JobdetailsComponent } from './Jobdetails.component';
// tslint:disable-next-line:no-unused-expression
declare var $: any;
@Component({
  selector: 'app-steps-step1-jobresponsibilities',
  templateUrl: './jobresponsibilities.component.html',
  styleUrls: ['./jobresponsibilities.component.css']
})

export class JobResponsibilitiesComponent implements OnInit, OnDestroy {

 // @ViewChild(JobdetailsComponent) jobDetail: JobdetailsComponent;

  private subscription: Subscription;
  responsibilities: '';
  responsibilitieslist: Roles[];
  roleModel: RoleModel;
  roles: Roles;
  roleList: any = [];
  roleIdList: PjRole[] = [];
  roleId = new PjRole();
  roleJobTitleList: any;
  jobTitle: string;
  // jobTitle: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.roleModel = new RoleModel(0, null, null);
      this.appService.currentjobtitle.subscribe((data) => {
        this.jobTitle = data; // And he have data here too!
      });
  }

  // private addResponsibilities() {
  //   this.appService.addResponsibilities(this.responsibilities);
  // }

  private deleteResponsibility(index: number) {
    this.appService.deleteResponsibilities(index);
    this.roleList.splice(index, 1);
     this.roleIdList.splice(index, 1);
  }

  ngOnInit() {
    // if (localStorage.getItem('jobId') != null) {
    this.responsibilitieslist = this.appService.getResponsibilities();
    this.subscription = this.appService.responsibilitesChanged
      .subscribe(
        (responselist: Roles[]) => {
          this.responsibilitieslist = responselist;
        }
      );

      this.roleIdList = this.appService.getAddedResponsibilities();
      this.subscription = this.appService.addedresponsibilitiesChanged
        .subscribe(
          (responselist: PjRole[]) => {
            this.roleIdList = responselist;
          }
        );

        // this.appService.currentjobtitle.subscribe((data) => {
        //   this.jobTitle = data; // And he have data here too!
        // });
      //  }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // adding roles and saving them

  AddRoles() {
    if ($('#responsibilitiesName').val() && this.roleModel.RoleId > 0) {
      // if (this.roleModel.RoleId > 0) {
      // this.roleList.push(this.roleModel);
      // this.roleIdList.push(this.roleModel.RoleId);
      this.itemCollection(this.roleModel, this.roleList);
      this.roleModel = new RoleModel(0, null, null);
      this.roleJobTitleList = [];
      $('#responsibilitiesName').val('');
    } else if ($('#responsibilitiesName').val() && this.roleModel.RoleId <= 0) {
      // this.roleModel.RoleId = 0;
      this.roleModel.RolesAndResponsibilities = $('#responsibilitiesName').val();
      // if ( this.appService.jobtitle != null) {
      //   this.roleModel.JobTitle = this.appService.jobtitle.tostring();
      // }
      this.appService.saveRoles(this.roleModel)
        .subscribe(
          data => {
            this.roleModel.RoleId = data;
            // this.roleList.push(this.roleModel);
            // this.roleIdList.push(this.roleModel.RoleId);
            this.itemCollection(this.roleModel, this.roleList);
            this.roleModel = new RoleModel(0, null, null);
            this.roleJobTitleList = [];
          });
      $('#responsibilitiesName').val('');
    } else {
      return false;
    }
    $('#responsibilitiesName').val();
    console.log(this.roleModel);
    console.log(this.roleList);
  }
  itemCollection(item, itemArr ) {
    const itemSearch = itemArr.filter(function (value) {
        if (item.RoleId === value.RoleId) {
          return value;
        }
    });
    if (itemSearch.length === 0) {
      itemArr.push(item);
      this.roleId.RoleId = item.RoleId;
      this.roleIdList.push(this.roleId);
      this.roles = new Roles();
      this.roles.RoleId = item.RoleId;
      this.roles.Role = item.RolesAndResponsibilities;
      this.appService.addResponsibilities(this.roles);
    } else {
      const index = itemArr.indexOf(itemSearch[0]);
      itemArr[index].quantity = item.quantity;
    }
    console.log(itemArr);
  }
  GetTitleRoles() {
    // let jobtitle = this.jobDetail.selectedTitle;
    // if (jobtitle === undefined) {
    //   jobtitle = '';
    // }
   // if (jobtitle && val) {
      const roleObj = new RoleJobTitle();
      roleObj.JobTitle =  this.jobTitle;
      roleObj.Role = $('#responsibilitiesName').val();
      this.appService.getRoles(roleObj)
        .subscribe(
          data => {
            this.roleJobTitleList = data;
          });
    // }
  }

  SetRoleValue(val) {
    $('#responsibilitiesName').val(val.RolesAndResponsibilities);
    this.roleModel.RolesAndResponsibilities = val.RolesAndResponsibilities;
    this.roleModel.RoleId = val.RoleId;
    this.roleJobTitleList = [];
  }
  changeRoles12(val) {
    alert(val);
  }
}
export class RoleJobTitle {
  JobTitle: string;
  Role: string;

}
export class PjRole {
  public RoleId: number;
}

