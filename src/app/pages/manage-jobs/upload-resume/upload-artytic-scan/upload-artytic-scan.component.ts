import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-artytic-scan',
  templateUrl: './upload-artytic-scan.component.html',
  styleUrls: ['./upload-artytic-scan.component.scss']
})
export class UploadArtyticScanComponent implements OnInit {
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
