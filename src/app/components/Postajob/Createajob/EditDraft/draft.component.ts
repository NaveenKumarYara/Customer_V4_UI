import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any; 
@Component({
  
  selector: 'app-editdraft',
  templateUrl: './draft.component.html'
})
export class EditDraftComponent {

  constructor( private fb: FormBuilder, private router: Router) {

  }
 

  ngOnInit() {
  
  }
}

