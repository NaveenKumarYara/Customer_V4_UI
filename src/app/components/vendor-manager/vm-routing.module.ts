import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VendorManagerComponent } from "./vendor-manager.component";
import { VendorListComponent } from "./vendor-list/vendor-list.component";
import { VendorDetailComponent } from "./vendor-detail/vendor-detail.component";

const routes: Routes = [
  { path: "", component: VendorListComponent },
  { path: "vendor-details", component: VendorDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VmRoutingModule {}
