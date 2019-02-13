import { Component, OnInit, Inject, Input, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ProfileLinks} from '../../../models/ProfileLinks';
import { JobdetailsService } from '../../../jobdetails.service';
declare var $: any;
@Component({

  selector: 'app-profilelinks',
  templateUrl: './profilelinks.component.html',
  styleUrls: ['./profilelinks.component.css'],
})
export class ProfileLinkComponent implements OnInit {
  @Input() userId: number;
  links: ProfileLinks[];
  constructor( private fb: FormBuilder, private router: Router, private jobdetailsservice: JobdetailsService) {

  }

  GetLinks() {
    return this.jobdetailsservice.getProfileLinks(this.userId).subscribe(res => {
       this.links = res;
    });
  }

  ngOnInit() {
  this.GetLinks();
  }
}

