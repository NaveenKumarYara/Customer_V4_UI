import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth.routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SettingsHttpService } from "src/settings/settings.http.service";
import { SettingsService } from "src/settings/settings.service";


import { ToastrModule, ToastrService } from 'ngx-toastr';
@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent
	
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		ToastrModule.forRoot()
	],
	providers:[SettingsHttpService,SettingsService,ToastrService],
})

export class AuthModule {
	
}