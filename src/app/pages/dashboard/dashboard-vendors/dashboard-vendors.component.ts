import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-dashboard-vendors',
  templateUrl: './dashboard-vendors.component.html',
  styleUrls: ['./dashboard-vendors.component.scss']
})
export class DashboardVendorsComponent implements OnInit {

  customOptions: OwlOptions  = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    center:false,
    margin: 20,

    navText: ['<span class="mdi mdi-chevron-left"></span>', '<span class="mdi mdi-chevron-right"></span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  @Input() AdminStats: any ='';
  @Input() tabName: any = ''; // decorate the property with @Input();
  @Output("tabbingClickHandler") tabbingClickHandler: EventEmitter<any> = new EventEmitter();
  constructor() { }
 
  ngOnInit(): void {
    
  }
  
}
