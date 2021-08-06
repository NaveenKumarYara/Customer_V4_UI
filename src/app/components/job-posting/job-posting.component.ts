import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.css']
})
export class JobPostingComponent implements OnInit {

  constructor(private router: Router, private appService: AppService, private zone: NgZone) { }

  ngOnInit() {
  }


  createJob() {
    $("#activepostjob").addClass('active');
    let activepostjob = true;
    localStorage.setItem('activepostjob', JSON.stringify(activepostjob));
    //this.router.navigateByUrl('/app-step1');
    //this.router.navigate(['/app-step1'])
    this.router.navigate(["/app-job-posting", "app-step2"]);
    // this.location.go('/app-createajob');
    // this.reload();
  }
}
