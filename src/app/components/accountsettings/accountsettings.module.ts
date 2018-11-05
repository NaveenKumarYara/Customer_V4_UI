import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { UsersComponent } from './users/users.component';
import { BillingAndPaymentsComponent } from './billing-and-payments/billing-and-payments.component';
import { EstimatesComponent } from './billing-and-payments/estimates/estimates.component';
import { BillingDetailsComponent } from './billing-and-payments/billing-details/billing-details.component';
import { BillingHistoryComponent } from './billing-and-payments/billing-history/billing-history.component';
import { ManageSubscriptionsComponent } from './billing-and-payments/manage-subscriptions/manage-subscriptions.component';
import { NavigationcomponentComponent } from './navigationcomponent/navigationcomponent.component';
import { AccountsettingdetailsComponent } from './accountsettingdetails/accountsettingdetails.component';
import {SharedModule} from '../../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './../../app.router';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule, BrowserModule,
    routing,    
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [AccountsettingsComponent, UsersComponent, BillingAndPaymentsComponent, EstimatesComponent, BillingDetailsComponent, BillingHistoryComponent, ManageSubscriptionsComponent, NavigationcomponentComponent, AccountsettingdetailsComponent]
})
export class AccountsettingsModule { }
