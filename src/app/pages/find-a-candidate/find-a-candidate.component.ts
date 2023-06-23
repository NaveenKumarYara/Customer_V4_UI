import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-find-a-candidate',
  templateUrl: './find-a-candidate.component.html',
  styleUrls: ['./find-a-candidate.component.scss']
})
export class FindACandidateComponent implements OnInit {
  viewLayout = 'grid';
  start:number=1;
  last:any;
  showCardCarousel:boolean = false;
  p:number = 1;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    center:false,
    margin: 20,
    items: 1,
    navText: ['<span class="mdi mdi-chevron-left"></span>', '<span class="mdi mdi-chevron-right"></span>'],
    nav: true
  }
  constructor() { }

  ngOnInit(): void {
    this.viewLayout = 'grid';
    window.resizeBy(1,2);
  }

  showCardCarouselHandler() {
    this.showCardCarousel = true;
  }

  showCardCarouselHideHandler() {
    this.showCardCarousel = false;
  }

  listCount(count:any) {
    this.start = count;
    
    this.start = this.start * 6 - 6;
    if(this.start == 0)
    {
      this.start = 1;
    }
    this.last = count * 6;
    if (this.last > 10) {
      this.last = 10;
    }
  }

  
  layoutView(name:string){
    this.viewLayout = name;
  }
}
