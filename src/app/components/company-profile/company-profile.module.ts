import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { BasicinfoComponent } from './basicinfo/basicinfo.component';
import { OtherinfoComponent } from './otherinfo/otherinfo.component';
import { LocationsComponent } from './locations/locations.component';
import { AboutcompanyComponent } from './aboutcompany/aboutcompany.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { WhitepaperComponent } from './whitepaper/whitepaper.component';
import { QuestionsComponent } from './questions/questions.component';
import { AchievementsandawardsComponent } from './achievementsandawards/achievementsandawards.component';
import { CultureComponent } from './culture/culture.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './../../app.router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CompanyProfileService } from './company-profile.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule
    ],
    providers: [CompanyProfileService],
  declarations: [CompanyprofileComponent, BasicinfoComponent, OtherinfoComponent, LocationsComponent, AboutcompanyComponent, BenefitsComponent, SpecialitiesComponent, WhitepaperComponent, QuestionsComponent, AchievementsandawardsComponent, CultureComponent]
})
export class CompanyProfileModule { }
