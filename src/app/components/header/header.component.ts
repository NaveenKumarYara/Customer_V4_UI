import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../shared/guard/auth.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'  ,
    changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HeaderComponent implements OnInit{  
  appTitle = 'Tenendus';
  isLoggedIn$: Observable<boolean>; 
  customer:any;
  profilePic:any;
  profileThumbnail: string;
  constructor( private router: Router,private ref: ChangeDetectorRef,private authService: AuthService) {

  }
  Logout() {
    sessionStorage.clear();
    this.authService.logout();  
    this.router.navigateByUrl('/home' , { replaceUrl: true });
}
ngOnInit()
{

    this.ref.markForCheck();
    this.isLoggedIn$ = this.authService.isLoggedIn; 
    this.customer = JSON.parse(localStorage.getItem('user'));
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
}


export class customer
{
    UserProfilePictureUrl: string;
}
