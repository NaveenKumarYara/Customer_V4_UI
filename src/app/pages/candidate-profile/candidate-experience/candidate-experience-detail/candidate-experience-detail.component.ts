import { Component, OnInit } from '@angular/core';
import { SlickCarouselComponent } from "ngx-slick-carousel";

@Component({
  selector: 'app-candidate-experience-detail',
  templateUrl: './candidate-experience-detail.component.html',
  styleUrls: ['./candidate-experience-detail.component.scss']
})
export class CandidateExperienceDetailComponent implements OnInit {
  currentRate = 3;
  constructor() { }

  slideConfig = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  ngOnInit(): void {
  }

}
