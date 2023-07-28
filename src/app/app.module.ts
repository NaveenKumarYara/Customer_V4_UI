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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './shared/interceptors/spinner-interceptor';


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
    NgxSpinnerModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
