import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { a } from '@angular/core/src/render3';
import { AppService } from '../../../../../app.service';
import { Roles } from '../../../models/jobPostInfo';
import { PjRole } from '../Jobresponsibilities.component';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-responsibilities-dialog',
  templateUrl: './responsibilities-dialog.component.html',
  styleUrls: ['./responsibilities-dialog.component.css']
})
export class ResponsibilitiesDialogComponent implements OnInit {
  saveBulk = new ParseResponsibilities();
  parseRoles: string;
  customer: any;
  responsibilities: XMLResponsibilities[] = []; // LoadResponsibilities[] = [];
  newresponsibility = '';
  loadResponsibilities: LoadResponsibilities[] = [];
  // @Output()responsibilitiesAdded = new EventEmitter<XMLResponsibilities[]>();
  constructor(public dialogRef: MatDialogRef<ResponsibilitiesDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: any,
  private appService: AppService) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
   }
  ngOnInit() {
  }
  ParseResponsibilities() {
    const x = this.parseRoles;
    if (x.length > 0) {
    const result =  x.split(/(.+)((\r?\.+)*)/igm); // working
      // let  i = 1;
    result.forEach(element => {
      const resp = new XMLResponsibilities();
      if (element === undefined) {
        return false;
      } else if (element !== '') {
      resp.RolesandResponsibilities = element.trim();
      if (resp.RolesandResponsibilities !== '') {
        // resp.Index = i;
        const check = this.respExists(resp, this.responsibilities);
      if (check === false) {
        this.responsibilities.push(resp);
       }
      }
      }
    });
    } else {return false; }
  }

  addResponsibility() {
    if (this.newresponsibility.length > 0 ) {
    const resp = new XMLResponsibilities();
    resp.RolesandResponsibilities = this.newresponsibility;
    const check = this.respExists(resp, this.responsibilities);
    if (check === false) {
      this.responsibilities.push(resp);
     }
    }
  this.newresponsibility = '';
  }
  respExists(resp, list) {​
    return list.some(function(elem) {
         return elem.RolesandResponsibilities === resp.RolesandResponsibilities;
    });
  }

  SaveBulkResponsibilities() {
    // const x = this.parseRoles;
    // // const result = x.match(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)(\s|[A-Z].*)/g);
    // //  const result = x.split('(?<!\w\.\w.)(?<![A-Z][a-z]\.;)(?<=\.|\?)(\s|[A-Z].;*)');
    // //  const result1 = x.split('[\.;\?!][\'\"\u2018\u2019\u201c\u201d\)\]]*\s*(?<!\w\.\w.;)(?<![A-Z][a-z][a-z]\.;)(?<![A-Z][a-z]\.;)(?<![A-Z]\.;)\s+)');
    // //  const result2 = x.split('(?<=[^A-Z].[.?]) +(?=[A-Z])');
    // //  const result = x.match(/^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g);
    //   // const result = x.match(/(.+;?<=\.|\?)((\r?\n.+)*)/g);
    //   // const result2 = x.split(/(.+)((\r?\n.+)*)/g);working somehow
    //   // const result1 = x.match(/[^\.!\.$\?]+[\.!\.$\?]+/g );
    //   // const result =  x.match(/(.+?([A-Z].)[\.|\?](?:['")\\\s]?)+?\s?)/igm);
    //   // const result1 =  x.match(/\S.*?\."?(?=\s|$)/igm);
    //   // const result2 =  x.match(/[.*+?^${}()|[\]\\]/igm);
    //   //  const result6 =  x.match(/(.+)((\r?\n.+)*)/igm); //
    //      const result =  x.split(/(.+)((\r?\.+)*)/igm); // working
    //   //   const result2 =  x.match(/[.*+?^${}()|[\]\\]/g);
    //   // const result3 =  x.split(/<br \/>(?=&#?[a-zA-Z0-9]+;)/g);
    //   //   const result4 = x.split(/(<br \/>&#?[a-zA-Z0-9]+);/g);
    //   //   const result5 = x.split(/<br \/>(&#?[a-z\d]+;)/gi);
    //   //   const result6 = x.split(/(<br \/>)&#?[a-zA-Z0-9]+;/g);
    //   const result3 =  x.split(/(.+?([A-Z].)[\.|\?](?:['")\\\s]?)+?\s?)/igm);
    //   const result4 =  x.split(/\S.*?\."?(?=\s|$)/g);
    //   const result5 =  x.split(/[.*+?^${}()|[\]\\]/gm);
    // console.log(result);
    this.saveBulk.UserId = this.customer.UserId;
    this.saveBulk.JobId = this.data.JobId;
    this.saveBulk.XmlRoles = this.responsibilities;
    // result.forEach(element => {
    //   const resp = new XMLResponsibilities();
    //   if (element === undefined) {
    //     return false;
    //   } else if (element !== '') {
    //   resp.RolesandResponsibilities = element.trim();
    //   if (resp.RolesandResponsibilities !== '') {
    //     this.saveBulk.XmlRoles.push(resp);
    //   }
    //   }
    // });
    this.appService.addBulkResponsibilities(this.saveBulk).subscribe(
      (data) => {
        this.appService.getJobResponsibilities(this.data.JobId).subscribe(x => {
            this.loadResponsibilities = x; // need to check condition
          // this.appService.this.responsibilities
          const roles: Roles[] = [] as Roles[];
          // [] as Car[];
          this.loadResponsibilities.forEach(element => {
            this.clearExistingResponsibilities();
            const role = new Roles();
            role.Role = element.RolesAndResponsibilities;
            role.RoleId = element.RoleId;
            this.appService.addResponsibilities(role);
            this.dialogRef.close();
          });
        });
     //  this.responsibilitiesAdded.emit(this.responsibilities);
    });
  }
  clearExistingResponsibilities() {
    this.appService.responsibilities = [];
        this.appService.responsibilitesChanged = new Subject<Roles[]>();
        this.appService.addedresponsibilities = [];
        this.appService.addedresponsibilitiesChanged = new Subject<PjRole[]>();
  }

  deleteResponsibilities(index) {
    this.responsibilities.splice(this.responsibilities.indexOf(index), 1);
    // this.responsibilities =  this.responsibilities.filter(x => x.Index !== index); this works as well
  }
}
 export class ParseResponsibilities {
  public UserId: number;
  public JobId: number;
  public XmlRoles: XMLResponsibilities[];
  constructor() {
    this.XmlRoles = [];
  }
 }
export class XMLResponsibilities {
 public RolesandResponsibilities: string;
}
export class LoadResponsibilities {
  public JobResponsibilityId: number;
  public JobId: number;
  public RoleId: number;
  public RolesAndResponsibilities: string;
}

