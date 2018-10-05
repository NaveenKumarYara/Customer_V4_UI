import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { RoleModel } from '../../models/jobPostInfo';
import { JobdetailsComponent } from './Jobdetails.component';
// tslint:disable-next-line:no-unused-expression
declare var $: any;
@Component({
  selector: 'app-steps-step1-jobresponsibilities',
  templateUrl: './jobresponsibilities.component.html'
})

export class JobResponsibilitiesComponent implements OnInit, OnDestroy {

  @ViewChild(JobdetailsComponent) jobDetail: JobdetailsComponent;

  private subscription: Subscription;
  responsibilities: '';
  responsibilitieslist: string[];
  roleModel: RoleModel;

  roleList: any = [];
  roleIdList: PjRole[] = [];
  roleId = new PjRole();
  roleJobTitleList: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
      this.roleModel = new RoleModel(0, null, null);
  }

  private addResponsibilities() {
    this.appService.addResponsibilities(this.responsibilities);
  }

  private deleteResponsibility(index: number) {
    this.appService.deleteResponsibilities(index);
  }

  ngOnInit() {
    this.responsibilitieslist = this.appService.getResponsibilities();
    this.subscription = this.appService.responsibilitesChanged
      .subscribe(
        (responselist: string[]) => {
          this.responsibilitieslist = responselist;
        }
      );
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
      if ( this.jobDetail.selectedTitle != null) {
        this.roleModel.JobTitle = this.jobDetail.selectedTitle;
      }
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
        // this.appService.addResponsibilities(this.responsibilities);
    } else {
      const index = itemArr.indexOf(itemSearch[0]);
      itemArr[index].quantity = item.quantity;
    }
    console.log(itemArr);
  }
  GetTitleRoles(val) {
    // let jobtitle = this.jobDetail.selectedTitle;
    // if (jobtitle === undefined) {
    //   jobtitle = '';
    // }
   // if (jobtitle && val) {
      const roleObj = new RoleJobTitle();
      roleObj.JobTitle = '.net developer'; // this.appService.jobtitle.value;
      roleObj.Role = val.key;
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

}
export class RoleJobTitle {
  JobTitle: string;
  Role: string;

}
export class PjRole {
  public RoleId: number;
}
