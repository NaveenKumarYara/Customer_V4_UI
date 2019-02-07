import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any; 
@Component({
  
  selector: 'editdraft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css'],
})
export class EditDraftComponent {

  constructor( private fb: FormBuilder, private router: Router) {

  }
 

  ngOnInit() {
  
  }
}

