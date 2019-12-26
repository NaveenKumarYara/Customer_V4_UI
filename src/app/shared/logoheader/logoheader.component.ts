import { Component ,OnInit,ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { environment } from '../../../environments/environment.prod';
import { billEstimates } from '../../../models/billEstimates';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
@Component({
    selector: 'app-Logoheader',
    templateUrl: './logoheader.component.html'   
})
export class LogoHeaderComponent implements OnInit {  
  customer:any;
  companyLogo:any;
  bill:billEstimates; 
  addPricing = new payment();
  constructor( private appService: AppService,private router: Router,private toastr:ToastsManager, private _vcr: ViewContainerRef) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
    this.toastr.setRootViewContainerRef(_vcr);
    if (this.customer == null) {
        this.Logout();
    }
    // sessionStorage.setItem('ProfileThumbnail', this.candidateDetails.UserProfilePictureUrl);
    else {
        let pic = sessionStorage.getItem('ProfileThumbnail');
        if (pic) {
            if (pic.length > 55) {
                this.customer.UserProfilePictureUrl = pic;
            }
        }
    }
    
  }

  


    GetBillingDuration()
   {
    return this.appService.getBillEstimates(this.customer.UserId).subscribe(res => {
      this.bill = res;
      if(new Date(this.bill.endDate) < new Date())
      {
      this.PlanExipry(res);
      }
   });
  }

  PlanExipry(bill)
 {
  this.addPricing.Id = bill.id;
  this.addPricing.UserId = bill.userId;
  this.addPricing.PlanId = bill.planId;
  this.addPricing.StartDate = bill.startDate;
  this.addPricing.EndDate = bill.endDate;
  this.addPricing.IsActive = false;
  this.appService.UpdatePlanDetails(this.addPricing).subscribe(data => {
    this.GetBillingDuration();
    this.addPricing= new payment();
  });
  
}

  

  Logout() {
    sessionStorage.removeItem('userData');
    sessionStorage.clear();
    this.router.navigateByUrl('/login' , { replaceUrl: true });
    //window.location.href = environment.customerLogin;
}

ngOnInit()
{
    this.GetBillingDuration();
}
}


export class payment
   {
    public Id:number;
    public UserId:number;
    public PlanId:number;
    public StartDate:Date;
    public EndDate:Date;
    public IsActive:boolean;
   }