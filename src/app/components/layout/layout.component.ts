import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
declare var $: any; 
@Component({
  
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {

  constructor( private fb: FormBuilder, private router: Router) {

  }
 
  SignUp()
  {
    this.router.navigateByUrl('signup'); 
  }
  Login()
  {
    this.router.navigateByUrl('home'); 
  }

  ngOnInit() {
  
    var min = "-100px", // remember to set in css the same value
    max = "0px";
    $("#recrit_btn").click(function() {
      $(".recrit_links").hide("slow");
      $(".recrit_hide").hide();
      $(".recrit_div").show();
      $(".recrit_div").animate({
          marginLeft: max
      });
      $(".sign_logo").animate({
          width: 0,
          height: 0,
          opacity: 0
      });
  });
  
  function login_1() {
  
      $(".recrit_links").hide("slow");
      $(".recrit_hide").hide();
      $("#hiring_sign").hide();
      $(".recrit_div").show();
      $("#hiring_login").show();
      $(".recrit_div").animate({
          marginLeft: max
      });
      $(".sign_logo").animate({
          width: 0,
          height: 0,
          opacity: 0
      });
  }
  
  $("#jobs_btn").click(function() {
      $(".job_links").hide("slow");
      $(".content-left").css("background-color", "white");
      $(".content-left-	 h2").css("color", "black");
      $(".jobs_hide").hide();
      $(".jobs_div").show();
      $(".jobs_div").animate({
          marginLeft: max
      });
      $(".sign_logo").animate({
          width: 0,
          height: 0,
          opacity: 0
      });
  });
  
  function login_2() {
      $(".job_links").hide("slow");
      $(".content-left").css("background-color", "white");
      $(".content-left-	 h2").css("color", "black");
      $(".jobs_hide").hide();
      $("#Jobs_sign").hide();
      $(".jobs_div").show();
      $("#Jobs_login").show();
      $(".jobs_div").animate({
          marginLeft: max
      });
      $(".sign_logo").animate({
          width: 0,
          height: 0,
          opacity: 0
      });
  }
  
  $("#recrit_close").click(function() {
      $(".recrit_links").show("slow");
      $(".recrit_div").hide();
      $(".recrit_hide").show();
      $(".recrit_div").animate({
          marginLeft: min
      });
      $(".sign_logo").animate({
          width: 191,
          height: 78,
          opacity: 1
      });
  });
  
  $("#jobs_close").click(function() {
      $(".job_links").show("slow");
      $(".content-left").css("background-color", "#97e4cd");
      $(".content-left-wrapper h2").css("color", "black");
      $(".jobs_div").hide();
      $(".jobs_hide").show();
      $(".jobs_div").animate({
          marginLeft: min
      });
      $(".sign_logo").animate({
          width: 191,
          height: 78,
          opacity: 1
      });
  });
  $("#Jobs_login").fadeOut(100)
  
  function jobs_login() {
      $("#Jobs_sign").fadeOut(10)
      $("#Jobs_login").fadeIn("slow")
  }
  $("#hiring_login").fadeOut(100)
  
  function hiring_login() {
      $("#hiring_sign").fadeOut(10)
      $("#hiring_login").fadeIn("slow")
  }
  
  function Jobs_close() {
      $("#Jobs_login").fadeOut(10)
      $("#Jobs_sign").fadeIn("slow")
  }
  
  function hiring_close() {
      $("#hiring_login").fadeOut(10)
      $("#hiring_sign").fadeIn("slow")
  }
  
  $("#job_forgot").fadeOut(100)
  
  function job_forgot() {
      $("#Jobs_login").fadeOut(10)
      $("#job_forgot").fadeIn("slow")
  }
  $("#hiring_forgot").fadeOut(100)
  
  function hiring_forgot() {
      $("#hiring_login").fadeOut(10)
      $("#hiring_forgot").fadeIn("slow")
  }
  
  function loginback1() {
      $("#job_forgot").fadeOut(10)
      $("#Jobs_login").fadeIn("slow")
  }
  
  function loginback2() {
      $("#hiring_forgot").fadeOut(10)
      $("#hiring_login").fadeIn("slow")
  }

  }
}

