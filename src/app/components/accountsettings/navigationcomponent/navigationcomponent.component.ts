import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InviteUsersComponent} from '../InviteUsers/invite.component';

@Component({
  selector: 'app-navigationcomponent',
  templateUrl: './navigationcomponent.component.html',
  styleUrls: ['./navigationcomponent.component.css']
})
export class NavigationcomponentComponent implements OnInit {
@ViewChild(InviteUsersComponent)invite:InviteUsersComponent;
customer:any; 
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.customer = JSON.parse(sessionStorage.getItem('userData'));
  }

  cl()
  {
    this.router.navigateByUrl('/app-accountsettings', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/app-inviteusers']);
  }); 
  }

}
