import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VendorDetailComponent } from "./vendor-detail/vendor-detail.component";
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VmRoutingModule } from "./vm-routing.module";

@NgModule({
  imports: [CommonModule,VmRoutingModule],
  declarations: [VendorListComponent, VendorDetailComponent],
  entryComponents:[]
})
export class VmModule { }
