import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  
  selector: 'features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  

  constructor( private fb: FormBuilder, private router: Router) {

  }
 


  


  ngOnInit() {
  }
}

