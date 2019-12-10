import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app.service';
import { PlanFeature } from "../../../../../models/PlanFeature";

@Component({
  selector: 'app-manage-subscriptions',
  templateUrl: './manage-subscriptions.component.html',
  styleUrls: ['./manage-subscriptions.component.css'],
  providers: [AppService]
})
export class ManageSubscriptionsComponent implements OnInit {
  Plans:PlanFeature[]=[];
  constructor(private appService: AppService) {

   }

  ngOnInit() {
    this.GetPlans();
  }

  GetPlans()
  {
    return this.appService.getPricingPlans().subscribe(res => {
      this.Plans = res;
  });
  }

}
