import { VariableBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  sectionActive: any;

  constructor() { }

  ngOnInit(): void {
  }

  scrollTo(className: string):void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    this.sectionActive = className;
    element.scrollIntoView({ behavior: 'smooth' });
 }
}
