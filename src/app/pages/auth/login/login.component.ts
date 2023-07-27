import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/components/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService,ToastrService]
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  loading = false;
  submitted = false;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$";
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router,private _service: ApiService,private toastr: ToastrService) { 
    this.loginform = this.formBuilder.group({
      'Email': ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.compose([Validators.required])],
    });
  }

  get f() { return this.loginform.controls; }

  ngOnInit(): void {
  }
  //   login1(username: string, password: string) {
  //     return this.http.post<any>('/api/authenticate', { username: username, password: password })
  //         .map((user: { token: any; }) => {
  //             // login successful if there's a jwt token in the response
  //             if (user && user.token) {
  //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
  //                 localStorage.setItem('currentUser', JSON.stringify(user));
  //             }

  //             return user;
  //         });
  // }

  login() {
    this.submitted = true;
    if (!this.loginform.valid) {
      this.loginform.reset();
      this.toastr.error('Please provide the valid details.','Oops!!',{  positionClass: 'toast-bottom-left'});
    }
    else  {
      this.loginform.value.UserName = this.loginform.value.Email;
     
        this._service.validateCheckemail(this.loginform.value.Email)
        .subscribe((res:any)=>
        {
          if (res != 5 && res != 2) {

          this._service.Login(this.loginform.value)
          .subscribe(
              (data:any) => {
                    if(data.IsActive != false)
                    {
                      this.router.navigateByUrl('home');    
                    }
                    else
                    {
                      this.toastr.error('Please check the email account and activate your Account','Oops!!',{  positionClass: 'toast-bottom-left'});
                    }
                        
            })

          }
          else
          {
            this.toastr.error('Please check details your are trying to sign in as jobseeker','Oops!!',{  positionClass: 'toast-bottom-left'});
          }

        })
        
        }    
        
             
  }

}
