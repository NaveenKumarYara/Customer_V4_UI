import { VariableBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  sectionActive: any;
  showCard: boolean = false;
  currentRate = 3;
  public isCollapsed = false;

  navBar = {
    title: 'Navbar',
    spyTargetContainerId: 'navbar',
    spyActiveClass: 'active',
    items: [
      {
        name: 'Position Details',
        fragment: 'section-one'
      },
      {
        name: 'Client Information',
        fragment: 'section-two'
      },
      {
        name: 'Salary & Location',
        fragment: 'section-three'
      },
      {
        name: 'Skills',
        fragment: 'section-four'
      },
      {
        name: 'Additional Details',
        fragment: 'section-five'
      }
    ]
  };

  
  constructor() { }

  ngOnInit(): void {
    this.sectionActive = 'section-one';
  }

  showCardHandler() {
    this.showCard = !this.showCard;
  }

  scrollTo(className: string):void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    this.sectionActive = className;
    element.scrollIntoView({ behavior: 'smooth' });
 }
}