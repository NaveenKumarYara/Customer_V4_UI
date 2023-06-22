import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountsettingdetailsComponent } from "./accountsettingdetails/accountsettingdetails.component";
import { AccountsettingsComponent } from "./accountsettings/accountsettings.component";
import { BillingAndPaymentsComponent } from "./billing-and-payments/billing-and-payments.component";
import { InviteUsersComponent } from "./InviteUsers/invite.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: "",
    component: AccountsettingsComponent,
    children: [
      { path: "", redirectTo: "app-accountsettingdetails", pathMatch: "full" },
      { path: "app-accountsettingdetails", component: AccountsettingdetailsComponent },
      { path: "app-users", component: UsersComponent },
      { path: "app-billing-and-payments", component: BillingAndPaymentsComponent },
      { path: "app-billing-and-payments/:id", component: BillingAndPaymentsComponent },
      { path: "app-inviteusers", component: InviteUsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsettingsRoutingModule {}
