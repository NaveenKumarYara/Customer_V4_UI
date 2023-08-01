import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.scss']
})
export class UploadResumeComponent implements OnInit {
  stepActive: any;
  constructor() { }

  ngOnInit(): void {
    this.stepActive = 1;
  }

  stepHandler(name: any) {
    this.stepActive = name;
  }
}
