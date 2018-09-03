import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-steps-step2-personalityType',
  templateUrl: './personalityType.component.html'
})

export class PersonalityTypeComponent implements OnInit, OnDestroy {  


  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

 

 

  ngOnInit() {
    
  }

  ngOnDestroy() {
  }
}
