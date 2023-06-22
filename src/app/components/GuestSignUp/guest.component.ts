import { Component , ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  
  selector: 'guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
})
export class GuestComponent {
  

  constructor(private route: ActivatedRoute, private router: Router) {

  }
 







  ngOnInit() {


  }
}



