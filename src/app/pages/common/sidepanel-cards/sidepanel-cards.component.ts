import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidepanel-cards',
  templateUrl: './sidepanel-cards.component.html',
  styleUrls: ['./sidepanel-cards.component.scss']
})
export class SidepanelCardsComponent implements OnInit {
  @Input() jobCard: boolean = false;
  @Input() job: any = null;
  constructor() { }

  ngOnInit(): void {
  }

}
