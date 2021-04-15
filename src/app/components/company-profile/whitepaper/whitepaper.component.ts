import { Component, OnInit, Input,ViewContainerRef, ViewChild} from '@angular/core';
import {  GetCompanyWhitePaper } from '../../../../models/GetCompanyWhitePaper';
import { GetCompanyNewsInfo } from '../../../../models/GetCompanyNewsInfo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';
import { CompanyProfileService } from '../company-profile.service';
import { ApiService } from '../../../shared/services/api.service/api.service';
import { AlertService } from '../../../shared/alerts/alerts.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-whitepaper',
  templateUrl: './whitepaper.component.html',
  styleUrls: ['./whitepaper.component.css'],
  providers: [ApiService, AlertService]
})
export class WhitepaperComponent implements OnInit {
//@Input() getcompanywhitepaper: GetCompanyWhitePaper;
//@Input() getcompanynewsinfo: GetCompanyNewsInfo;
getcompanywhitepaper: GetCompanyWhitePaper[];
fileUploadForm: FormGroup;
customer: any;
name:any;
description:any;
Src: string;
filedata=new FormData();
PUpload: File;
docFile:string;
customerId: any;
userId: any;
edit:any;
public file_srcs: string[] = [];
public debug_size_before: string[] = [];
public debug_size_after: string[] = [];
selectedFileNames: string[] = [];

constructor (private companyprofileservice: CompanyProfileService,private _service: ApiService,private _vcr:ViewContainerRef, private route: Router, private fb: FormBuilder,private spinner: NgxSpinnerService, private toastr: ToastsManager,  private alertService: AlertService) { 
  this.customer = JSON.parse(sessionStorage.getItem('userData'));
  this.customerId = this.customer.CustomerId;
  this.userId = this.customer.UserId;
  this.toastr.setRootViewContainerRef(_vcr);
  this.fileUploadForm = this.fb.group({ 
    'CompanyWhitePaperId':[0, Validators.nullValidator],
    'CustomerId': ['', Validators.required],
    'ProfileId': [0, Validators.nullValidator],
    'WhitePaper': [null, Validators.nullValidator],
    'Description': ['', Validators.nullValidator],
    'Title':['', Validators.nullValidator],
    'CompanyWhitePaper': ['', Validators.nullValidator],
    'Url': ['', Validators.nullValidator],
    'FileExtension': ['', Validators.nullValidator],
  });
 }


 DeleteId(id)
    {

      this._service.DeleteService('ProfileAPI/api/DeleteCompanyWhitePaper?companyWhitePaperId=',id)
      .subscribe(
      data => 
      {
        this.populateCompanyWhitePapers();
      }
      )
  
    }

  ngOnInit() {
    this.populateCompanyWhitePapers();

    (function ($) {
      function navLineResizeHandler() {
        var nav = $('.nav-tabs');
        var activeLink = nav.children('li.active');
        var activeLine = nav.children('.active-line');
        var windowWidth = $(window).scrollLeft();
    
        $.each(activeLine, function (index, element) {
          var $element = $(element);
          $element.css({
            width: $element.parent().children(".active").css("width"),
            left: $element.parent().children(".active").position().left - windowWidth
          });
        });
      }
    
      function navLineClickHandler() {
        var btnWidth = $(this).css("width");
        var line = $(this).parent().find(".active-line");
        var btnBox = this.getBoundingClientRect();
        var windowBox = this.parentNode.getBoundingClientRect();
    
        line.css({
          width: btnWidth,
          left: btnBox.left - windowBox.left
        });
      }
    
      $(document).ready(navLineResizeHandler);
    
      $(window).resize(function () {
        setTimeout(navLineResizeHandler, 1000);
      });
    
      var appliedTabBtn = $(".active-line-move .nav-tabs li");
      var appliedLine = $(".active-line-move .nav-tabs .active-line");
      appliedTabBtn.on("click", navLineClickHandler);
    
      
    })($);

    $('#whitepapers_input').change(function() {
      var i = $(this).prev('label').clone();
      var file = $('#whitepapers_input')[0].files[0].name;
      $(this).next('.file-label').text(file);
    });


  }

  ClearThevalues()
  {
      this.name = '';
      this.description = '';
      this.fileUploadForm.reset();
      this.fileUploadForm.patchValue({ 'CompanyWhitePaperId': 0 });
  }

  populateCompanyWhitePapers() {
    return this.companyprofileservice.getCompanyWhitePapers(this.customerId).subscribe(res => {
        this.getcompanywhitepaper = res;
    });
  }

  goToLink(url: string){
   window.open(url, "_blank");
  }

  getFileDetails(e) {
    this.selectedFileNames = [];
    let request = '';
    const formData = new FormData();
    const fileSelected: File = e.target.files[0];
    const stringToSplitDoc = fileSelected.name;
    const y = stringToSplitDoc.split('.');
    const exp = y[1];
    if (exp === 'pdf' || exp === 'PDF' ) {
      if (fileSelected.size > 2048576) {
        // Swal('Too Big Size.. File Not Allowed');
        this.alertService.error('Too Big Size.. File size greater than 2MB Not Allowed!');
        setTimeout(() => {
          this.alertService.clear();
        }, 3000);
      }
      if (this.fileUploadForm.value !== '') {
        this.fileUploadForm.value.Title = this.name;
        this.fileUploadForm.value.Description = this.description;
        this.fileUploadForm.value.Url = '';
        this.fileUploadForm.value.customerId = this.customerId;
        this.fileUploadForm.value.CompanyWhitePaper = e.target.files[0].name;
        this.fileUploadForm.value.FileExtension = e.target.files[0].type;
        this.edit = 0;
        request = JSON.stringify(this.fileUploadForm.value);
      }
  
        for (let i = 0; i < e.target.files.length; i++) {
          this.selectedFileNames.push(e.target.files[i].name);
          formData.append('WhitePaper', e.target.files[i]);
        }
        debugger
       // this.loaddata = false;
        formData.append('Model', request);
        this.filedata= formData;
    }
    else 
    {
      this.alertService.error('Please upload the files with extension pdf');
      setTimeout(() => {
        this.alertService.clear();
      }, 3000);    
  }

  
  }
  Edit(val)
  {
    this.name = val.Title;
    this.description = val.Description;
    this.fileUploadForm.value.CompanyWhitePaperId = val.CompanyWhitePaperId;
    this.docFile = val.Logotitle;
    this.edit = 1;
  }



  uploadMultiple() {
    if(this.edit == 0)
    {
    this._service.byteStorage(this.filedata, 'ProfileAPI/api/SaveWhitePaper').subscribe(data => {
         this.name = '';
         this.description = '';
         this.edit = null;
         this.populateCompanyWhitePapers();    
    });  
   }
   else if(this.edit == 1)
   {
    if (this.fileUploadForm.value !== '') {
      this.fileUploadForm.value.Title = this.name;
      this.fileUploadForm.value.Description = this.description;
      this.fileUploadForm.value.CompanyWhitePaper = this.docFile;
      this.fileUploadForm.value.Url = '';
      this.fileUploadForm.value.FileExtension = '';
      this.fileUploadForm.value.customerId = this.customerId;
    }
    this._service.PostService(this.fileUploadForm.value, 'ProfileAPI/api/UpdateCompanyWhitepaper').subscribe(data => {
         this.name = '';
         this.description = '';
         this.docFile = '';
         this.edit = null;
         this.populateCompanyWhitePapers();    
    });  
  }
}






}
