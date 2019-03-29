import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
@Component({
    selector: 'app-Logoheader',
    templateUrl: './logoheader.component.html'   
})
export class LogoHeaderComponent implements OnInit {  
  customer:any;
  companyLogo:any;
  constructor( private router: Router) {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
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

  Logout() {
    sessionStorage.removeItem('userData');
    sessionStorage.clear();
    //this.router.navigateByUrl('/login' , { replaceUrl: true });
    window.location.href = environment.customerLogin;
}

ngOnInit()
{
}
}