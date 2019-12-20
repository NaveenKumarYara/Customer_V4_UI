import { Component, OnInit, Input, Inject, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { Router } from '@angular/router';
import { CompanyProfileService } from '../company-profile.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {CompanyprofileComponent} from '../companyprofile/companyprofile.component';
@Component({
    selector: 'app-culturetest',
    templateUrl: './culturetest.component.html',
    styleUrls: ['./culturetest.component.css']
  })
  export class CultureTestComponent implements OnInit {
    constructor(  public dialogRef: MatDialogRef<CultureTestComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _vcr: ViewContainerRef, private _service: ApiService, private route: Router, private companyprofileservice: CompanyProfileService) {
      
    }
    ngOnInit() {
        
     }


    }