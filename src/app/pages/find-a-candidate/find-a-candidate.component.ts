import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-a-candidate',
  templateUrl: './find-a-candidate.component.html',
  styleUrls: ['./find-a-candidate.component.scss']
})
export class FindACandidateComponent implements OnInit {
  viewLayout = 'grid';
  start:number=1;
  last:any;
  p:number = 1;
  constructor() { }

  ngOnInit(): void {
    this.viewLayout = 'grid';
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
