import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  loading = false;
  submitted = false;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$";
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router,private _service: ApiService) { 
    this.loginform = this.formBuilder.group({
      'Email': ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.required])],
    });
  }

  get f() { return this.loginform.controls; }

  ngOnInit(): void {
  }

  login() {
    this.submitted = true;
    this.loading = true;
    if (!this.loginform.valid) {
      this.loginform.reset();
    }
    else  {
      this.loginform.value.UserName = this.loginform.value.Email;
      debugger
              this._service.Login(this.loginform.value)
                .subscribe(
                    data => {

                       
                          this.loading = false;
                          this.router.navigateByUrl('home');
                       
          
                  })
                }
  }

}
