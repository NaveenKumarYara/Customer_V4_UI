import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUploaderModule } from 'ngx-uploader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FindACandidateModule } from './pages/find-a-candidate/find-a-candidate.module';
import  { PostAJobModule } from './pages/post-a-job/post-a-job.module';
import { CandidateProfileModule } from './pages/candidate-profile/candidate-profile.module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgxSpinnerModule } from 'ngx-spinner';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
// import { JwtInterceptor } from 'src/settings/Jwt.interceptor';
// import { ErrorInterceptor } from 'src/settings/Error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DashboardModule,
    NgbModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    // NgSelectModule,
    FindACandidateModule,
    PostAJobModule,
    NgxUploaderModule,
    CandidateProfileModule,
    NgIdleKeepaliveModule.forRoot(),
    NgxSpinnerModule,
    
    CommonModule,  
    FormsModule, HttpClientModule,BrowserAnimationsModule,
    // MatProgressSpinnerModule
    
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
 

})
export class AppModule { }
