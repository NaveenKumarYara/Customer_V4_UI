import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewContainerRef, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppService } from '../../../app.service';
declare var $: any;
import * as FileSaver from 'file-saver';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiService } from "../../../shared/services/api.service";
import { JobdetailsService } from '../../jobdetails/jobdetails.service';
import { MatchingParameterDetails } from '../../jobdetails/models/jobdetailsprofile';
import swal from 'sweetalert2';
import { BulkApplyInvite, CandidateInformation } from '../../../shared/models';
import { LoadActiveProjectsComponent } from '../load-active-projects/load-active-projects.component';

import { Subject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
//import { FitlerComponent } from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../../shared/services';
import { CustomerContacts } from '../../../../models/customercontacts';
import { CustomerUsers } from '../../Postajob/models/jobPostInfo';
import { SettingsService } from '../../../../settings/settings.service';
import { MapsAPILoader } from '@agm/core';
import { StartConversation } from '../../jobdetails/view-jobdetails/viewjobdetails-candidate-profile/send-email/send-email.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Chart from "chart.js";
import * as _html2canvas from "html2canvas";
import { FormBuilder, Validators } from "@angular/forms";
import { title } from "process";
const html2canvas: any = _html2canvas;
import * as introJs from 'intro.js/intro.js';
import { OnDestroy } from '@angular/core/public_api';
import { EditprofileCmComponent } from '../../jobdetails/view-jobdetails/editprofile-cm/editprofile-cm.component';

@Component({
	selector: 'cm-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit,OnDestroy {
	currentView: string = 'Grid';
	showFilterNavBar: boolean = false;
	showMenu: boolean = false;
	customer: any = null;
	fileUploadForm: FormGroup;
	filedata=new FormData();
	mins:number = 0;
	maxs:number = 3;
	EDetails:any=[];
	DDetails:any=[];
	CDetails:any=[];
	customerId: any = null;
	searchText: any = null;
	currentNo: number[] = [];
	SelectedCandidate:any=[];
	userId: any = null;
	candidates: CandidateInformation[] = [];
	candidatesLoading: boolean = false;
	currentPage: number = 1;
	totalCandidatesCount: number = 0;
	totalPageCount: number = 1;
	pageCount: number = 15;
	list:any=[];
	selectedCandidate: any = null;
	selectedIndex: number;
	fileType = new Resume();
	fileExt: any;
	introJS = introJs();
	showDetail: boolean = false;
	skilltitleloading: boolean;
	jobsLoading: boolean;
	currentFilterType: string = '';
	isFilterDataLoading: boolean = false;
	statusid: number = 0;
     SName:any;
	managersList: Observable<CustomerUsers[]>;
	teammembers: '';
	GetContactsList: contactInfo[];
	customercontacts: CustomerContacts[];
	teammemberslist: CustomerUsers[];
	whatsapp: any;
	whatsappform: FormGroup;
	getTeammember: CustomerUsers;
	profileSharing = new ProfileShare();
	AddUser: boolean = false;
	UserId: any;
	SaveInfo = new contactInfo();
	info: number;
	EmailId: any = null;
	Name: any = null;
	usersloading: boolean;
	customerUser: number;
	showFilterCount: number = 0;
	subject: string;
	ccEmailAddress: string;
	isSendingEmail: boolean=false;
	ToEmailID: string;
	mailbox: any = false;
	@Input() shareUrl: string;
	navUrl: string;
	selectedUserName: number;
	selectedComments: any;
	type: string;
	private subscription: Subscription;
	selectedUserInput = new Subject<string>();
	isSharingStarted: boolean;
	emailAddresses: any;
	emailMessage: any;
	showFilterLocation: boolean;
	applyJobSidePanelShow: boolean;
	shareJobSidepanel: boolean;
	shareESidepanel: boolean;
	showFilterActive: boolean;
    pdetails:any;
	pmatching:any;
	isJobTypeShown: boolean;
	isSkillShown: boolean;
	isExperienceShown: boolean;
	isfullGridView: boolean=false;
	selectcard=-1;
	skillList: any;
	skilllist: any = [];
	selectedSkillName: any;
	selectedskillinput = new Subject<string>();
	selectedDomainInput = new Subject<string>();
	MinimumExperience: any;
	MaximumExperience: any;
	conversation = new StartConversation();

	smallRadarChartData = {
    labels: ["Job Fit", "Skill Fit", "Culture Fit", "Personality Fit", "Team Fit"],
    datasets: [
      {
        fill: true,
        backgroundColor: "rgb(54, 162, 235, 0.2)",
        borderColor: "#448afa",
        pointBackgroundColor: "#448afa",
        pointBorderColor: "#448afa",
        pointHoverBackgroundColor: "#448afa",
        borderWidth: 1,
        pointBorderWidth: 1,
        data: []
      },
    ],

  };

	filterTypes: any[] = [
		{ 'title': 'Job Type', 'value': 'jobType', 'url': 'https://jobsapi-dev.arytic.com/api/GetEmploymentType', 'result': [], 'iconClass': 'icon__jobtype__01' },
		{ 'title': 'Skills', 'value': 'skills', 'url': 'https://profileapi-dev.arytic.com/api/GetAllMasterSkills', 'result': [], 'iconClass': 'icon__skills__01' },
		{ 'title': 'Salary', 'value': 'salary', 'url': 'https://jobsapi-dev.arytic.com/api/GetSalaryRange', 'result': [], 'iconClass': 'icon__salary__01' },
		{ 'title': 'Location', 'value': 'location', 'url': 'https://profileapi-dev.arytic.com/api/GetAllCities', 'result': [], 'iconClass': 'icon__location__01' },
		{ 'title': 'Experience', 'value': 'experience', 'url': 'https://jobsapi-dev.arytic.com/api/GetExperience', 'result': [], 'iconClass': 'icon__experience__01' },
		{ 'title': 'JobTitle', 'value': 'jobTitle', 'url': "https://jobsapi-dev.arytic.com/api/GetAllJobTitles", 'result': [], 'iconClass': 'icon__title__01' },
		{ 'title': 'Availibilty Status', 'value': 'availibiltyStatus', 'url': '', 'result': [], 'iconClass': 'icon__status__01' },
		{ 'title': 'JobDomain', 'value': 'jobDomain', 'url': 'https://profileapi-dev.arytic.com/api/GetDomainName', 'result': [], 'iconClass': 'icon__domain__01' },
		{ 'title': 'ComapanyName', 'value': 'comapanyName', 'url': 'https://profileapi-dev.arytic.com/api/GetAllCompanyNames', 'result': [], 'iconClass': 'icon__company__01' },
		{ 'title': 'Education', 'value': 'education', 'url': 'https://jobsapi-dev.arytic.com/api/GetQualification', 'result': [], 'iconClass': 'icon__edu__01' },
		{ 'title': 'Certification', 'value': 'certification', 'url': 'https://profileapi-dev.arytic.com/api/GetAllCertifications', 'result': [], 'iconClass': 'icon__certified__01' }
	];
	items = [
		{ src: '../../../assets/images/candidatemanager/job-card.png' },
		{ src: '../../../assets/images/candidatemanager/job-card.png' },
		{ src: '../../../assets/images/candidatemanager/job-card.png' }
	];
	profile: any;
	// matchingParameterDetails: MatchingParameterDetails;
	jobid: number = 1002162;
	keywordSearchGroup: any;
	isKeywordSearch: any;
	searchValue: any;

	jobList: Observable<string[]>;

	jobInput = new Subject<string>();
	selectedJobId: any;

	filter: Array<any> = [];
	fields: Array<any> = [
		{
			caption: 'Email',
			width: 50,
			dataField: 'Email',
			dataType: 'string',
		},
		{
			caption: 'FirstName',
			width: 50,
			dataField: 'FirstName',
			dataType: 'string',
		},
		{
			caption: 'LastName',
			width: 50,
			dataField: 'LastName',
			dataType: 'string',
		},

		{
			caption: 'MiddleName',
			width: 50,
			dataField: 'MiddleName',
			dataType: 'string',
		},
		{
			caption: 'JobTitle',
			width: 50,
			dataField: 'JobTitle',
			dataType: 'string',
		},
		{
			caption: 'JobType',
			width: 50,
			dataField: 'JobType',
			dataType: 'string',
		},
		{
			caption: 'ContactNumber',
			width: 50,
			dataField: 'ContactNumber',
			dataType: 'string',
		},
		{
			caption: 'CompanyName',
			width: 50,
			dataField: 'CompanyName',
			dataType: 'string',
		},
		{
			caption: 'JobLocations',
			width: 50,
			dataField: 'JobLocations',
			dataType: 'string',
		},
		{
			caption: 'ProfilePercentage',
			width: 50,
			dataField: 'ProfilePercentage',
			dataType: 'number',
		}
	];
	closeResult: string;
	data: any;
	sortBY:any=0;
	selectedSkills: any ;
	isJobTitleShown: boolean;
	jobTitle: any;
	isCompanyShown: boolean;
	companyName: any;
	isEducationShown: any;
	isCertificationShown: boolean;
	educationName: any;
	isCertificationName: any;
	certificationName: any;
	domainList: any;
	domainLoading: boolean;
	isDomainShown: boolean;
	selectedDomains: any;
	searchJobValue: any;
	searchJob = new Subject<string>();
	activeJobs: any[];
	selectedSkillCount: number;
	selectedDomainCount: number;
	selectedProfileCount: number;
	selectedJobTitleCount: number;
	selectedExperienceCount: number;
	selectedCompanyCount: number;
	selectedEdcationCount: number;
	selectedCertificationCount: number;
	Image:any;
	@ViewChild('locationSearch') public locationSearchElement: ElementRef;
	@Output() childEvent = new EventEmitter<any>();
	selectedLocation: any;
	cityName: any;
	searchTerm = new Subject<string>();
	body: string;
	autocomplete: any;
	isGridShown: boolean;
	isTableShown: boolean;
	constructor(public dialogRef: MatDialogRef<DetailsComponent>, private appService: AppService, private readonly apiService: ApiService,
		private jobdetailsservice: JobdetailsService, private toastr: ToastsManager,  private fb: FormBuilder, private _vcr: ViewContainerRef,
		private dialog: MatDialog,
		private modalService: NgbModal, private readonly storageService: StorageService, private settingsService: SettingsService,
		private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private spinner: NgxSpinnerService
	) {
		this.customer = JSON.parse(sessionStorage.getItem('userData'));
		this.customerId = this.customer.CustomerId;
		this.userId = this.customer.UserId;
		const swal = require('sweetalert2');
		this.selectedIndex = 0;
		this.searchTerm.pipe(
			debounceTime(400),
			distinctUntilChanged())
			.subscribe(value => {
				if(value != undefined)
				{
					this.searchValue = value;
					this.searchCandidates();
				}
				
			});

		this.body = 'Join hands with us and make your goals achieved!.';
		this.subject = 'Please submit the consent';
	}

	GetProfileCard(PId)
	{
	 return this.apiService.GetService('IdentityAPI/api/GetSmartCard?jobId=0'+ '&profileId=',PId)
	 .subscribe(res => {debugger

		if(res != "No data")
		{
		    this.profileSharing.Image = res;
			this.Image=res;
		
		}
		else
		{
			this.clickme(PId);
		}
	 });
	}

	dataURLtoFile(dataurl, filename) {
 
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), 
			n = bstr.length, 
			u8arr = new Uint8Array(n);
			
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		
		return new File([u8arr], filename, {type:mime});
	}

	start()
	{
	  this.introJS.start();
	}

	tClose()
  {
    this.introJS.exit();
  }

  ngOnDestroy() {
    this.tClose();
  }

	clickme(val) {
		let request = '';
		const formData = new FormData();
		html2canvas(document.getElementById('aas' + val),{
		  useCORS: true,letterRendering: 1,backgroundColor:"transparent",scale: 2,
		  logging: true }).then(canvas => {
		  // document.querySelector(".result").appendChild(canvas);
			var image = canvas.toDataURL();
			var file = this.dataURLtoFile(image,val+'.png');
			this.fileUploadForm.value.Url = '';
			this.fileUploadForm.value.customerId = this.customerId;
			this.fileUploadForm.value.JobId = 0;
			this.fileUploadForm.value.ProfileId = val;
			this.fileUploadForm.value.JobSmartCard = file.name;
			this.fileUploadForm.value.FileExtension = '.png';
			request = JSON.stringify(this.fileUploadForm.value);
			formData.append('SmartCard', file);
			formData.append('Model', request);
			this.filedata= formData;
			this.apiService.byteStorage(this.filedata, 'IdentityAPI/api/SaveSmartCard').subscribe(data => {
			  let res = data;
			  this.spinner.hide();
			  this.GetProfileCard(val);	
		 });  
	
		  
		});
	  }

	ngOnInit() {
		this.spinner.show();
		
		this.initInitialState();
		this.isGridShown = true;
		this.currentView = 'Grid';
		this.fileUploadForm = this.fb.group({ 
			'CustomerId': ['', Validators.required],
			'ProfileId': [0, Validators.nullValidator],
			'JobId': [0, Validators.nullValidator],
			'SmartCard':[null, Validators.nullValidator],
			'JobSmartCard': ['', Validators.nullValidator],
			'Url': ['', Validators.nullValidator],
			'FileExtension': ['', Validators.nullValidator],
		  });
		//   this.mapsAPILoader.load().then(
		// 	() => {
		// 		this.autocomplete = new google.maps.places.Autocomplete(this.locationSearchElement.nativeElement, { types: ['(regions)'] });
		// 		this.autocomplete.setComponentRestrictions({ 'country': ['us'] });
		// 		this.autocomplete.addListener('place_changed', () => {
		// 			this.ngZone.run(() => {
		// 				//debugger;
		// 				const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
		// 				if (place === null || place.geometry === undefined || place.geometry === null) {
		// 					this.cityName = '';
		// 					//this.searchCandidates();
		// 					return;
		// 				}
		// 				if (place.geometry) {
		// 					console.log(place.address_components[0].short_name);
		// 					let locations = place.address_components[0].short_name;
		// 					let x = locations.split(",");
		// 					this.cityName = x[0];
		// 					if (this.cityName !== '') {
		// 						//this.searchCandidates();
		// 					}
		// 					this.childEvent.emit(place.address_components[0].short_name);

		// 				}
		// 			});
		// 		});

		// 	});
	}

	closeSidebarHandler() {
		this.showMenu = false;
		if (this.showFilterCount == 0) {
			this.showFilterNavBar = false;
		}
	}

	GetDomain(Pid) {
		  this.apiService.GetService('ProfileAPI/api/GetCandidateDomain?profileId=', Pid)
			.subscribe(
			  domain => {
				if(domain.length>0)
				{
					this.DDetails = domain;
				}
				else
				{
					this.DDetails = [];
				}
				
			  })
	}

	GetEducation(Pid) {
		this.apiService.GetService('ProfileAPI/api/GetEducation?profileId=', Pid)
		  .subscribe(
			edu => {
				if(edu.length>0)
				{
					this.EDetails = edu;
				}
				else
				{
					this.EDetails = [];
				}
			 
			})
      }

	  GetCertification(Pid) {
		this.apiService.GetService('ProfileAPI/api/GetCertification?profileId=', Pid)
		  .subscribe(
			ed => {
			  if(ed.length>0)
			  {
				this.CDetails = ed;
			  }
			  else
			  {
				  this.CDetails = [];
			  }
			 
			})
      }

		
	
	  

	fullGridViewShow(profile,k) {
		this.selectcard = k;
		if(k>=0)
		{			
				this.GetDefaultSkills(profile.profileId);	
				this.GetDefaultProfileDetails(profile.profileId);
				this.GetDefaultProfileCompleteness(profile.profileId);
				this.GetDomain(profile.profileId);
				this.GetEducation(profile.profileId);
				this.GetCertification(profile.profileId);
				this.isfullGridView = true;
				this.candidates.filter(x => {
					if(x.ProfileId == profile.profileId)
					{
                      x.IsSelected = true;
					}
				     }
					)
					
		}
		else
		{
			this.isfullGridView = false;
		}
	

	}

	fullGridViewHide() {
		this.isfullGridView = false;
	}

	searchByLocation(newValue) {
		//debugger;
		if (this.cityName !== '') {
			this.cityName = '';
			this.searchCandidates();
		}
	}
	searchBySearchValue(value) {
		//this.searchValue = value;
		this.searchCandidates();
	}
	initInitialState() {
		//this.keywordSearchValidators();
		
		this.showDetail = false;
		this.Filter(0);
		this.getSkills();
		this.getDomains();
		this.getCandidates();	
		// this.keywordSearchGroup.get('searchValue').valueChanges.pipe(debounceTime(600))
		// 	.subscribe(res => {
		// 		this.keywordSearchGroup.get('searchValue').setValue(res);
		// 		this.getCandidates();
		// 	});
		this.AddUser = false;
		this.spinner.hide();
	}

	getSkills() {
		this.skillList = concat(
			of([]), // default items
			this.selectedskillinput.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				tap(() => this.skilltitleloading = true),
				switchMap(term => this.appService.searhchSkills(term).pipe(
					catchError(() => of([])), // empty list on error
					tap(data => {
						//debugger;
						let y = data;
						this.skilltitleloading = false;
					})
				))
			)
		);
		//debugger;
		let k = 10;
	}
	getDomains() {
		this.domainList = concat(
			of([]), // default items
			this.selectedDomainInput.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				tap(() => this.domainLoading = true),
				switchMap(term => this.appService.searchDomains(term).pipe(
					catchError(() => of([])), // empty list on error
					tap(data => {
						//debugger;
						let y = data;
						this.domainLoading = false;
					})
				))
			)
		);
		//debugger;
		let k = 10;
	}

	add3Dots(string, limit) {
		const dots = "...";
		if (string.length > limit) {
		  string = string.substring(0, limit) + dots;
		}
		return string;
	  }
    
	  prevS()
	  {
			this.mins = 0;
			this.maxs = 3;	 
	  }

	  nextS()
	  {
			this.mins = 3;
			this.maxs = 6;		
	  }


	prevSkills(data, index) {
		console.log("current number", this.currentNo);
		if (this.currentNo[index] > 0) {
		  this.currentNo[index] = this.currentNo[index] - 1;
		} else {
		  this.currentNo[index] = 0;
		}
		console.log("current number", this.currentNo);
	  }
	  nextSkills(data, index) {
		var len = data.split(",", 10).length / 3;
		if (len - 1 > this.currentNo[index]) {
		  this.currentNo[index] = this.currentNo[index] + 1;
		} else {
		  this.currentNo[index] = Math.round(len - 1);
		}
	  }

	GetDefaultSkills(ProfileId) {
		this.apiService.GetService('ProfileAPI/api/GetCandidateSkillSet?profileId=', ProfileId).subscribe(dat => {
			if(dat.length>0)
			{
		     	this.list = dat.sort((a,b)=>a.ExpInYears > b.ExpInYears);	
			}
			else
			{
				this.list=[];
			}

		})
	  }

	  GetDefaultProfileDetails(ProfileId) {
		this.apiService.GetService('ProfileAPI/api/GetProfileDetailsAndAddress?profileId=', ProfileId).subscribe(pro => {
           this.pdetails=pro[0];
		})
	  }

	  GetDefaultProfileCompleteness(ProfileId) {
		this.apiService.GetService('IdentityAPI/api/GetCandidateProfileCompletenessByProfileId?profileId=', ProfileId).subscribe(pr => {
          debugger
			this.pmatching=pr;
		})
	  }

	GetContacts() {
		return this.appService.GetContactInfo(this.customerId, 0).subscribe(res => {
			this.GetContactsList = res;
		});
	}
	getcustomerusers() {
		return this.appService.getCustomerContacts(this.customerId).subscribe(res => {
			this.customercontacts = res;
			this.customercontacts = this.customercontacts.filter(
				name => name.FirstName != "Invited" && name.IsRemove === false);
		});
	}
	clearTeamMemebers() {
		for (let i = 0; i <= 10; i++) {
			const index = i;
			this.appService.deleteTeammember(index);
		}
		this.deleteTeammember(0);
	}
	public addTeammembers() {
		if (this.getTeammember !== undefined) {
			const check = this.teamExists(this.getTeammember, this.teammemberslist);
			if (check === false) {
				this.appService.addTeammember(this.getTeammember);
			}
			$('#teamMbr').val('');
		}
	}
	private deleteTeammember(index: number) {
		this.appService.deleteTeammember(index);
	}
	teamExists(team, list) {
		if (list === undefined) {
			return false;
		}
		for (var index = 0; index < list.length; index++) {
			if (list[index].UserId === team.UserId) {
				return true;
			}
		}
	}
	Whatsapp() {
		this.whatsapp = undefined;
		this.whatsappform.reset();
	}
	changeTeam(val) {
		this.getTeammember = val;
	}
	teamchange(val, inf) {
		this.AddUser = val;
		this.info = inf;
	}
	next() {
		++this.selectedIndex;
	}
	previous() {
		if (this.selectedIndex < 0) {
			--this.selectedIndex;
		}
	}
	applySidePanel() {
		this.getActiveJobs();
		this.applyJobSidePanelShow = true;
	}

	shareSidePanel(Pid) {
		this.GetContacts();
		this.clearTeamMemebers();
		this.getcustomerusers();
		this.shareJobSidepanel = true;
		this.GetProfileCard(Pid);
		console.log('hi kinjal')
	}

	sendEmail() {

		this.isSendingEmail = true;
		//this.spinner.show();
		this.conversation.FullName = this.SName;
		this.conversation.Subject = this.subject;
		this.conversation.CCEmailAddress = this.ccEmailAddress;
		this.conversation.Body = this.body;
        this.conversation.ToEmailID = this.ToEmailID;

		// if(){
        if(this.mailbox == false)
		{
			this.conversation.AppLink = this.settingsService.settings.CandidateSignUp;
			this.conversation.UserCheck =   'Yes I will Join';
		}
	   else
	   {
		this.conversation.AppLink = this.settingsService.settings.CandidateLogin;
		this.conversation.UserCheck =  'Login';
	   }
		this.jobdetailsservice.StartConversation(this.conversation).subscribe(data => {
	
		  if (data === 0) {
			//this.spinner.hide();
			this.isSendingEmail = false;
			this.toastr.success('Mail Sent', 'Success');
			setTimeout(() => {
			  this.toastr.dismissToast;
			}, 2000);
			this.shareESidepanel = false;
			this.conversation.FullName = '';
			this.conversation.Subject = '';
			this.conversation.Body = '';
			this.conversation.ToEmailID = '';
			this.SName = '';
			this.mailbox = false;
		  }
		},
		  error => {
			this.isSendingEmail = false;
		  },
		  () => {
			this.isSendingEmail = false;
		  });
	  }

	shareESidePanel(Email,Ispublic,name) {
		this.GetContacts();
		this.SName = name;
		this.clearTeamMemebers();
		this.getcustomerusers();
		this.shareESidepanel = true;
		this.mailbox = Ispublic;
		this.body = 'Join hands with us and make your goals achieved!.';
		if(Ispublic == true)
		{
			this.subject = 'Your profile may suits to our organisation';
		}
		else
		{
			this.subject = 'Join with arytic';
		}
		
		this.ToEmailID = Email;
	}
	MyCProfilesExport()
	{
		let Name = this.customer.FirstName + ' ' + 'Profiles';
		this.downloadFile(this.candidates,Name);
	
	  }
	
	  downloadFile(data: any, filename) {
		let csvData = this.ConvertToCSV(data, [ 'fullName', 'email', 'contactNumber','jobTitleName','company','locations']);
		console.log(csvData)
		let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
		let dwldLink = document.createElement("a");
		let url = URL.createObjectURL(blob);
		let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
		if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
		  dwldLink.setAttribute("target", "_blank");
		}
		dwldLink.setAttribute("href", url);
		dwldLink.setAttribute("download", filename + ".csv");
		dwldLink.style.visibility = "hidden";
		document.body.appendChild(dwldLink);
		dwldLink.click();
		document.body.removeChild(dwldLink);
	  }
	
	  ConvertToCSV(objArray: any, headerList: any) {
		let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		let str = '';
		let row = 'S.No,';
	
		for (let index in headerList) {
		  row += headerList[index] + ',';
		}
		row = row.slice(0, -1);
		str += row + '\r\n';
		for (let i = 0; i < array.length; i++) {
		  let line = (i + 1) + '';
		  for (let index in headerList) {
			let head = headerList[index];
	
			line += ',' + array[i][head];
		  }
		  str += line + '\r\n';
		}
		return str;
	  }
	

	hideApplySidePanel() {
		this.applyJobSidePanelShow = false;
		this.getCandidates();
	}

	hideShareSidePanel() {
		this.shareJobSidepanel = false;
	}

	hideShareESidePanel() {
		this.shareESidepanel = false;
	}

	onFocus() {
		this.showFilterLocation = true;
	}
	showJobPrview(profileId) {
		this.showDetail = true;
		this.selectedCandidate = this.candidates.find(x => x.ProfileId == profileId);
		this.getCandidateProfile(profileId);
	}
	getCandidateProfile(profileId) {
		let params = new HttpParams();
		params = params.append("profileId", profileId);
		params = params.append("isPublic", '1');
		this.apiService.GetService("ProfileAPI/api/GetProfileInfo?", params).subscribe((response) => {
			this.profile = response;
		});
	}
	hideJobDetail() {
		this.showDetail = false;
	}
	changeView(type) {
		this.currentView = type;
	}

	toggleFilter() {
		this.showFilterNavBar = !this.showFilterNavBar;
		this.currentFilterType = '';
		if (this.showFilterNavBar === false) {
			this.showMenu = false;
			let listClass = document.getElementsByClassName('sub__item');
			let classArray = [];
			let i = 0;
			for (i = 0; i < listClass.length; i++) {
				classArray.push(i);
			}
			classArray.forEach(function (val) {
				if (document.getElementsByClassName('active')[0]) {
					document.getElementsByClassName('sub__item')[val].classList.remove('active')
				}
			});
		}
	}
	hideFilter() {
		this.showMenu = false;
	}
	showNavigation() {
		this.showMenu = true;
	}
	showSub(id) {
		let listClass = document.getElementsByClassName('sub__item');
		let classArray = [];
		let i = 0;
		for (i = 0; i < listClass.length; i++) {
			classArray.push(i);
		}
		classArray.forEach(function (val) {
			if (document.getElementsByClassName('active')[0]) {
				document.getElementsByClassName('sub__item')[val].classList.remove('active')
			}
		});
		document.getElementsByClassName('sub__item')[id].classList.add('active');
	}
	resetFilterType() {
		this.currentFilterType = '';
	}
	onFilterSelect(filterType, id) {
		this.filterTypes.filter(x => x.value == filterType)[0].result.filter(y => y.id == id)[0].isSelected = !this.filterTypes.filter(x => x.value == filterType)[0].result.filter(y => y.id == id)[0].isSelected
	}
	getFilterData(filterType, url) {
		this.currentFilterType = filterType;
		if (this.filterTypes.filter(x => x.value == filterType)[0].result.length == 0) {
			this.isFilterDataLoading = true;
			this.appService.getFilterDataInCM(url).subscribe(
				(res: any) => {
					var obj = [];
					switch (filterType) {
						case 'jobType':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].EmploymentTypeId;
								temp['value'] = res[i].EmploymentType;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'skills':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].id;
								temp['value'] = res[i].Code;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'salary':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].SalaryRangeId;
								temp['value'] = res[i].SalaryRange;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'location':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].CityId;
								temp['value'] = res[i].CityName;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'experience':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].ExperienceId;
								temp['value'] = res[i].YearsOfExperience;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'jobTitle':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].JobTitleId;
								temp['value'] = res[i].JobTitle;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'availibiltyStatus':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].EmploymentTypeId;
								temp['value'] = res[i].EmploymentType;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'jobDomain':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].DomainId;
								temp['value'] = res[i].DomainName;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'comapanyName':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].EmploymentTypeId;
								temp['value'] = res[i].EmploymentType;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'education':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].QualificationId;
								temp['value'] = res[i].QualificationName;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
						case 'certification':
							for (var i = 0; i < res.length; i++) {
								var temp = {};
								temp['id'] = res[i].certificationnameid;
								temp['value'] = res[i].certificationname;
								temp['isSelected'] = false;
								obj.push(temp);
							}
							break;
					}
					this.filterTypes.filter(x => x.value == filterType)[0].result = obj;
					this.isFilterDataLoading = false;
				},
				error => {
					console.log('Error occurred!');
					this.isFilterDataLoading = false;
				});
		}
	}
	// searchFunc(val) {
	// 	if (val != '') {
	// 		this.searchValue = val;
	// 		this.getCandidates();
	// 	}
	// 	else {
	// 		this.searchValue = null;
	// 		this.getCandidates();
	// 	}
	// }
	DownloadResume(val, ProfileId): void {
		this.apiService.GetService("ProfileAPI/api/GetResume?profileId=", ProfileId).subscribe((fileData) => {
			this.fileType = fileData;
			let exp = this.fileType.Url.split(".").pop();
			this.fileExt = exp;
			this.toastr.success("Downloading!", "Success!");
			setTimeout(() => {
				this.toastr.dismissToast;
			}, 3000);

			if (this.fileExt == "pdf") {
				let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
				let blob = new Blob([byteArr], { type: "application/pdf" });
				FileSaver.saveAs(blob, val);
			} else if (this.fileExt == "doc" || this.fileExt == "docx") {
				var extension = ".doc";
				let byteArr = this.base64ToArrayBuffer(fileData.ResumeFile);
				let blob = new Blob([byteArr], { type: "application/pdf" });
				FileSaver.saveAs(blob, val + extension);
			}
		});
	}
	base64ToArrayBuffer(base64) {
		const binary_string = window.atob(base64);
		const len = binary_string.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	}
	onPageChange(pageValue) {
		this.currentPage += pageValue;
		this.getCandidates();
	}
	OpenCandidate(profileId, userId, percentage) {
		this.tClose();
		if (percentage < 50) {
			swal(
				{
					title: 'The candidate has not completed the profile',
					showConfirmButton: true,
					showCancelButton: true,
					type: "info",
					confirmButtonColor: '#66dab5',
					cancelButtonColor: '#FF0000',
					confirmButtonText: 'ok',
					cancelButtonText: 'No'
				}).then((result) => {
					if (result.value === true) {
						localStorage.setItem("cprofileId", profileId);
						localStorage.setItem("cuserId", userId);
						localStorage.setItem("checku", userId);
						const url = '/app-view-candidateprofile-detail';
						window.open(url, "_blank");

					}
				});
		}
		else {
			localStorage.setItem("cprofileId", profileId);
			localStorage.setItem("cuserId", userId);
			localStorage.setItem("checku", userId);
			const url = '/app-view-candidateprofile-detail';
			window.open(url, "_blank");
		}
	}
	getActiveJobs() {
		//debugger;
		this.candidatesLoading = true;
		this.customer = JSON.parse(sessionStorage.getItem('userData'));
		this.customerId = this.customer.CustomerId;
		if (this.searchJobValue === undefined) {
			this.searchJobValue = '';
		}
		this.appService.getActiveJobs(this.searchJobValue, this.customerId).subscribe(
			(res: any) => {
				this.activeJobs = [];
				if (res != null) {
					this.activeJobs = res;
				}
			},
			error => {
				//debugger;
				console.log('Error occurred!');
				this.candidatesLoading = false;
			});
	}
	// keywordSearchValidators() {
	// 	this.keywordSearchGroup = new FormGroup({
	// 		isKeywordSearch: new FormControl('0'),
	// 		searchValue: new FormControl(' ')
	// 	});
	// }
	shareJobToSelectedCandidates() {
		//debugger;
		//let candidates = this.candidates.filter(x => x.IsSelected);
		this.applyJobToSelectedCandidates();

	}
	applyJobToSelectedCandidates() {
		//debugger;
		let candidates = this.candidates.filter(x => x.IsSelected);
		let selectedJobs = this.activeJobs.filter(x => x.IsSelected);
		if (candidates.length > 0) {

			//let conversations = this.getEmailCinversations(candidates);

			//let selectedJob = this.selectedJobId;
			let bulkApply: BulkApplyInvite = { SelectedJobs: selectedJobs, SelectedCandidates: candidates };
			this.appService.applyJobToSelectedCandidates(bulkApply).subscribe(
				(res: any) => {
					this.selectedJobId = 0;
					swal(
						{
							title: 'Selected Job Applied successfully',
							showConfirmButton: true,
							showCancelButton: false,
							type: "success",
							confirmButtonColor: '#66dab5',
							cancelButtonColor: '#FF0000',
							confirmButtonText: 'Ok',
							cancelButtonText: 'No'
						}).then((result) => {
							this.applyJobSidePanelShow = false;
							this.initInitialState();
						});
					this.applyJobSidePanelShow = false;
					this.initInitialState();
				},
				error => {
					console.log('Error occurred!');
					this.candidatesLoading = false;
					swal(
						{
							title: 'Eror while applying for a job.',
							showConfirmButton: true,
							showCancelButton: false,
							type: "info",
							confirmButtonColor: '#66dab5',
							cancelButtonColor: '#FF0000',
							confirmButtonText: 'ok',
							cancelButtonText: 'Cancel'
						}).then((result) => {
							this.initInitialState();
						});
				});
		} else {
			swal(
				{
					title: 'Please select at least one candidate from the List',
					showConfirmButton: true,
					showCancelButton: false,
					type: "info",
					confirmButtonColor: '#66dab5',
					cancelButtonColor: '#FF0000',
					confirmButtonText: 'Ok',
					cancelButtonText: 'No'
				}).then((result) => {
					this.initInitialState();
				});
		}

	}
	getEmailCinversations(selectedCandidates: any): StartConversation[] {
		let conversations = new StartConversation()[selectedCandidates.length];
		for (var index: number; index < selectedCandidates.length; index++) {
			let conversation = new StartConversation();
			let data = selectedCandidates[index];
			conversation.FullName = data.firstname + data.lastname;
			conversation.Subject = this.subject;
			conversation.ToEmailID = data.email;
			conversation.Body = this.body;
			conversation.AppLink = this.settingsService.settings.CandidateLogin + ';lid=' + data.ccpid;
		}
		return conversations;
	}
	shareJob() {
		const dialogRef = this.dialog.open(LoadActiveProjectsComponent, {
			width: '250px',
			data: {
				buttonText: {
					ok: 'Save',
					cancel: 'No'
				}
			}
		});
		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
			if (confirmed) {
				const a = document.createElement('a');
				a.click();
				a.remove();
			}
		});
	}
	showFilterPanel() {
		//debugger;
		// const dialogRef = this.dialog.open(FitlerComponent, {
		// 	width: '250px',
		// 	data: {
		// 		buttonText: {
		// 			ok: 'Save',
		// 			cancel: 'No'
		// 		}
		// 	}
		// });
		// dialogRef.afterClosed().subscribe((confirmed: boolean) => {
		// 	//debugger;
		// 	let filters = JSON.parse(this.storageService.get('CurrentFilter'));
		// 	//debugger;
		// 	this.filter = filters;
		// 	this.getCandidates();
		// });
	}
	ShareProfile() {
		//debugger;
		let emailAddresses = this.emailAddresses;
		let message = this.emailMessage;
		let candidates = this.candidates.filter(x => x.IsSelected);
        
		if (candidates.length > 0) {
			let loggedInUser = JSON.parse(sessionStorage.getItem('userData'));
			let customerId = loggedInUser.CustomerId;
			this.isSharingStarted = true;
			this.profileSharing.InviteFriendId = 0;
			this.profileSharing.FromuserId = this.customerUser;
			this.profileSharing.ToUserId = "0";
			this.profileSharing.ToEmailId = emailAddresses;
			this.profileSharing.ApplicationName = 'Arytic';
			this.profileSharing.AppLink = this.settingsService.settings.CustomerAppprofile + ';Preid={0};Id=0;Cid=' + customerId;
			this.profileSharing.Comments = message != null ? message : 'Please review the profile shared to you';
			this.profileSharing.SelectedCandidates = candidates;
	    	this.jobdetailsservice.ShareProfile(this.profileSharing).subscribe(data => {
				//this.inviteform.reset();
				this.teammemberslist = [];
				$('#teamMbr').val('');
				//this.selectedUserName = ''
				this.getTeammember = new CustomerUsers();
				this.profileSharing = new ProfileShare();
				this.clearTeamMemebers();
				this.selectedComments = "";
				this.EmailId = " ";
				this.isSharingStarted = false;
				this.emailAddresses = "";
				this.emailMessage = "";
				swal(
					{
						title: 'Selected Profiles shared successfully',
						showConfirmButton: true,
						showCancelButton: false,
						type: "success",
						confirmButtonColor: '#66dab5',
						cancelButtonColor: '#FF0000',
						confirmButtonText: 'Ok',
						cancelButtonText: 'No'
					}).then((result) => {
						this.shareJobSidepanel = false;
						this.initInitialState();
					});
				this.shareJobSidepanel = false;
				// setTimeout(() => {
				// 	this.toastr.dismissToast;
				// 	this.initInitialState();
				// }, 3000);
			}, error => {
				this.isSharingStarted = false;
				console.log('error:', JSON.stringify(error));
			});
			
		
		} else {
			swal(
				{
					title: 'Please select at least one candidate from the List',
					showConfirmButton: true,
					showCancelButton: false,
					type: "info",
					confirmButtonColor: '#66dab5',
					cancelButtonColor: '#FF0000',
					confirmButtonText: 'OK',
					cancelButtonText: 'No'
				}).then((result) => {
					// this.initInitialState();
				});
		}
	}
	showFilterBar() {
		this.showFilterNavBar = !this.showFilterNavBar;
	}
	getSelectedSkills() {
		console.log(this.selectedSkills);
	}
	cancel() {
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isCompanyShown = false;
		this.isDomainShown = false;
		this.showFilterNavBar = false;
		this.showMenu = false;
		this.getCandidates();
	}
	cancelSkills() {
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isCompanyShown = false;
		this.isDomainShown = false;
		this.showFilterNavBar = false;
		this.showMenu = false;
		this.selectedSkills = null;
		this.selectedSkillCount = 0;
		this.getCandidates();
	}
	cancelExperience() {
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isCompanyShown = false;
		this.isDomainShown = false;
		this.showFilterNavBar = false;
		this.showMenu = false;
		this.MaximumExperience = null;
		this.MinimumExperience = null;
		this.selectedExperienceCount = 0;
		this.getCandidates();
	}
	searchCandidates() {
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isCompanyShown = false;
		this.isDomainShown = false;
		//this.showFilterNavBar = false;
		//this.showMenu = false;
		this.getCandidates();
	}
	selectSkills() {
		if (this.selectedSkills == null) {
			this.selectedSkillCount = 0;
		}
		else {
			this.selectedSkillCount = 1;
			this.showFilterCount++;
			this.showMenu = false;
		}
		this.searchCandidates();
	}
	selectDomians() {
		if (this.selectedDomains == null) {
			this.selectedDomainCount = 0;
		}
		else {
			this.selectedDomainCount = this.selectedDomains.length;
			this.showFilterCount++;
			this.showMenu = false;
		}
		this.searchCandidates();
	}
	selectExperience() {
		//debugger;
		if (this.MinimumExperience == 0 || this.MaximumExperience == 0) {
			this.selectedExperienceCount = 0;
		}
		else {
			this.selectedExperienceCount = 1;
			this.showFilterCount++;
			this.showMenu = false;
		}
		this.searchCandidates();
	}
	selectJobTitle() {
		//debugger;
		if (this.jobTitle == null || this.jobTitle == '') {
			this.selectedJobTitleCount = 0;
		}
		else {
			this.selectedJobTitleCount = 1;
			this.showFilterCount++;
			this.showMenu = false;
		}
		this.searchCandidates();
	}
	selectCompany() {
		//debugger;
		if (this.companyName == null || this.companyName == '') {
			this.selectedCompanyCount = 0;
		}
		else {
			this.selectedCompanyCount = 1;
			this.showFilterCount++;
			this.showMenu = false;
		}
		this.searchCandidates();
	}
	selectEducation() {
		if (this.educationName == null || this.educationName == '') {
			this.selectedEdcationCount = 0;
		}
		else {
			this.selectedEdcationCount = 1;
			this.showFilterCount++;
			this.showMenu = false;
		}
		this.searchCandidates();
	}
	selectCertification() {
		if (this.certificationName == null || this.certificationName == '') {
			this.selectedCertificationCount = 0;
		}
		else {
			this.selectedCertificationCount = 1;
			this.showFilterCount++;
			this.showMenu = false;
		}
		this.searchCandidates();
	}
	selectLocation() {

	}
	saveLocation() {
		let locations = this.selectedLocation;
		let x = locations.split(",");
		this.cityName = x[0];
	}
	showJobType() {
		//debugger;
		this.showMenu = true;
		this.isJobTypeShown = !this.isJobTypeShown;
		this.isSkillShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isDomainShown = false;
	}
	showSkill() {
		//debugger;
		this.showMenu = true;
		this.isSkillShown = !this.isSkillShown;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isCertificationShown = false;
		this.isEducationShown = false;
		this.isCompanyShown = false;
		this.isDomainShown = false;
	}
	showExperience() {
		//debugger;
		this.showMenu = true;
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isJobTitleShown = false;
		this.isCertificationShown = false;
		this.isEducationShown = false;
		this.isCompanyShown = false;
		this.isDomainShown = false;
		this.isExperienceShown = !this.isExperienceShown;
	}
	showJobTitle() {
		//debugger;
		this.showMenu = true;
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isCertificationShown = false;
		this.isEducationShown = false;
		this.isCompanyShown = false;
		this.isDomainShown = false;
		this.isJobTitleShown = !this.isJobTitleShown;
	}
	showCompany() {
		//debugger;
		this.showMenu = true;
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isCertificationShown = false;
		this.isEducationShown = false;
		this.isDomainShown = false;
		this.isCompanyShown = !this.isCompanyShown;
	}
	showEducation() {
		//debugger;
		this.showMenu = true;
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isCompanyShown = false;
		this.isCertificationShown = false;
		this.isDomainShown = false;
		this.isEducationShown = !this.isEducationShown;
	}
	showCertification() {
		//debugger;
		this.showMenu = true;
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isEducationShown = false;
		this.isDomainShown = false;
		this.isCertificationShown = !this.isCertificationShown;
	}
	showDomain() {
		//debugger;
		this.showMenu = true;
		this.isSkillShown = false;
		this.isJobTypeShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isEducationShown = false;
		this.isCertificationShown = false;
		this.isCompanyShown = false;
		this.isDomainShown = !this.isDomainShown;
	}
	clearSkillsFilter() {
		this.selectedSkills = null;
		if (this.selectedSkills == null) {
			this.selectedSkillCount = 0;
			this.showFilterCount--;
			this.showMenu = false;
			
			if (this.showFilterCount == 0) {
				this.showFilterNavBar = false;
			}
		}
		else {
			this.selectedSkillCount = 1;
		}
		this.searchCandidates();
	}
	clearExperienceFilter() {
		this.MinimumExperience = 0;
		this.MaximumExperience = 0;
		if (this.MinimumExperience == 0 || this.MaximumExperience == 0) {
			this.selectedExperienceCount = 0;
			this.showFilterCount--;
			this.showMenu = false;
			
			if (this.showFilterCount == 0) {
				this.showFilterNavBar = false;
			}
		}
		else {
			this.selectedExperienceCount = 1;
		}
		this.searchCandidates();
	}
	clearJobTitleFilter() {
		this.jobTitle = '';
		if (this.jobTitle == '') {
			this.selectedJobTitleCount = 0;
			this.showFilterCount--;
			this.showMenu = false;
			
			if (this.showFilterCount == 0) {
				this.showFilterNavBar = false;
			}
		}
		else {
			this.selectedJobTitleCount = 1;
		}
		this.searchCandidates();
	}
	clearDomainFilter() {
		this.selectedDomains = null;
		if (this.selectedDomains == null) {
			this.selectedDomainCount = 0;
			this.showFilterCount--;
			this.showMenu = false;
			
			if (this.showFilterCount == 0) {
				this.showFilterNavBar = false;
			}
		}
		else {
			this.selectedDomainCount = 1;
		}
		this.searchCandidates();
	}
	clearCompanyNameFilter() {
		this.companyName = '';
		if (this.companyName == '') {
			this.selectedCompanyCount = 0;
			this.showFilterCount--;
			this.showMenu = false;
			
			if (this.showFilterCount == 0) {
				this.showFilterNavBar = false;
			}
		}
		else {
			this.selectedCompanyCount = 1;
		}
		this.searchCandidates();
	}
	clearCertificationFilter() {
		this.certificationName = '';
		if (this.certificationName == '') {
			this.selectedCertificationCount = 0;
			this.showFilterCount--;
			this.showMenu = false;
			
			if (this.showFilterCount == 0) {
				this.showFilterNavBar = false;
			}
		}
		else {
			this.selectedCertificationCount = 1;
		}
		this.searchCandidates();
	}
	clearEducationFilter() {
		this.educationName = '';
		if (this.educationName == '') {
			this.selectedEdcationCount = 0;
			this.showFilterCount--;
			this.showMenu = false;
			
			if (this.showFilterCount == 0) {
				this.showFilterNavBar = false;
			}
		}
		else {
			this.selectedEdcationCount = 1;
		}
		this.searchCandidates();
	}
	clearAllFilters() {
		this.candidatesLoading = true;
		this.searchText = '';
		this.searchValue = '';
		// this.cityName = '';
		// (<HTMLInputElement>document.getElementById('autocomplete')).value = '';
		this.selectedSkills = null;
		this.showFilterCount = 0;
		if (this.showFilterCount == 0) {
			this.showMenu = false;
			this.showFilterNavBar = false;
		}
		if (this.selectedSkills == null) {
			this.selectedSkillCount = 0;
		}
		else {
			this.selectedSkillCount = 1;
		}

		this.MinimumExperience = 0;
		this.MaximumExperience = 0;
		if (this.MinimumExperience == 0 || this.MaximumExperience == 0) {
			this.selectedExperienceCount = 0;
		}
		else {
			this.selectedExperienceCount = 1;
		}

		this.jobTitle = '';
		if (this.jobTitle == '') {
			this.selectedJobTitleCount = 0;
		}
		else {
			this.selectedJobTitleCount = 1;
		}

		this.selectedDomains = null;
		if (this.selectedDomains == null) {
			this.selectedDomainCount = 0;
		}
		else {
			this.selectedDomainCount = 1;
		}

		this.companyName = '';
		if (this.companyName == '') {
			this.selectedCompanyCount = 0;
		}
		else {
			this.selectedCompanyCount = 1;
		}

		this.certificationName = '';
		if (this.certificationName == '') {
			this.selectedCertificationCount = 0;
		}
		else {
			this.selectedCertificationCount = 1;
		}

		this.educationName = '';
		if (this.educationName == '') {
			this.selectedEdcationCount = 0;
		}
		else {
			this.selectedEdcationCount = 1;
		}
		// this.autocomplete.set('place', null);
		this.searchCandidates();
	}
	findCandidates() {
		//this.cancel();
		this.getCandidates();
	}

	onSomeAction(event){
		if(event.keyCode === 13){
			this.cancel();

			this.getCandidates();
		}
	   }

   Filter(Sort)
   {
	this.sortBY = Sort;
	if(Sort === undefined)
	{
		this.sortBY=0;
	}
	else
	{
		this.sortBY = Sort;
	}
	this.getCandidates();
   }

   OpenEditProfile(ProfileId)
   {
	const dialogRef = this.dialog.open(EditprofileCmComponent,
		{
		  width: '65vw',
		  position: { right: '0px' },
		  height: '100vh',
		  data: {
			ProfileId: ProfileId
		  },
		  panelClass:'upload__resume__modal'
		}
	  );
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log('Dialog result: ${result}');

		this.getCandidates();
		let Profile = this.candidates.filter(x => {
			if(x.ProfileId == ProfileId)
			{
			  x.IsSelected = true;
			}
		});
			 
		this.fullGridViewShow(Profile,this.selectcard);
	  });
   }


	getCandidates() {
		this.candidatesLoading = true;


		let candidateSearch = new CandidateSearch();
		candidateSearch.PageNumber = this.currentPage;
		candidateSearch.PageSize = this.pageCount;
		candidateSearch.SearchValue = this.searchValue!=undefined?this.searchValue:'';
		if(candidateSearch.SearchValue != '')
		{
			candidateSearch.PageNumber=1;
		}
		if(this.selectedSkills != undefined)
		{
			candidateSearch.SelectedSkills = this.selectedSkills.toString();
		}
		else
		{
			candidateSearch.SelectedSkills = this.selectedSkills;
		}
		// candidateSearch.MinimumExperience = this.MinimumExperience;
		// candidateSearch.MaximumExperience = this.MaximumExperience;
		candidateSearch.JobTitle = this.jobTitle;
		candidateSearch.CompanyName = this.companyName;
		// candidateSearch.EducatonName = this.educationName;
		// candidateSearch.CertificationName = this.certificationName;
		candidateSearch.SelectedLocation = this.cityName;
		//candidateSearch.SelectedDomains = this.selectedDomains;
		candidateSearch.CustomerId = this.customerId;
		//candidateSearch.FilterValue = JSON.stringify(this.filter);
        candidateSearch.SortBy = this.sortBY;
		this.appService.getNewCandidates(candidateSearch).subscribe(
		//this.appService.getCandidates(candidateSearch).subscribe(
			(res: any) => {
				if (res != null) {
					//debugger;
					if (res.candidates != null && res.candidates.length > 0) {
						this.candidates = res.candidates;
						this.totalPageCount = res.totalPages;
						this.totalCandidatesCount = res.totalRecordsCount;
						// if (this.totalCandidatesCount < this.pageCount)
						// 	this.totalPageCount = 1;
						// else {
						// 	this.totalPageCount = Number((this.totalCandidatesCount / this.pageCount).toFixed());
						// }
					}
					else
						this.candidates = [];
				}
				else
					this.candidates = [];
				this.candidatesLoading = false;
			},
			error => {
				//debugger;
				console.log('Error occurred!');
				this.candidatesLoading = false;
			});
	}

	makeAllFalse() {

	}

	closeApplyJobWindow() {
		this.applyJobSidePanelShow = false;
		this.getCandidates();
	}
	showGrid() {
		this.isGridShown = true;
		this.isTableShown = false;
		this.currentView = 'Grid';
	}
	showTable() {
		this.isGridShown = false;
		this.isTableShown = true;
		this.currentView = 'List';
	}

	onSelectAll($event) {
		if ($event.target.checked) {
			for (var index = 0; index < this.candidates.length; index++) {
				this.candidates[index].IsSelected = true;
			}
		} else {
			for (var index = 0; index < this.candidates.length; index++) {
				this.candidates[index].IsSelected = false;
			}
		}
	}


	//Please do not uncomment this, this is causing the issue in filters.  Need to fine tune the method.

	// @HostListener('document:click', ['$event'])
	// 	onClick(event) {
	// 	var ignoreClickOnMeElement = document.getElementById('show_main_navigation');
	// 	//var ignoreClickOnMeElementOne = document.getElementById('filter_by_tech');
	// 	//var ignoreClickOnInput = document.getElementById('text_search');
	// 	var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
	// 	//var isClickInsideElementOne = ignoreClickOnMeElementOne.contains(event.target);
	// 	//var isClickInsideInput = ignoreClickOnInput.contains(event.target);
	// 	if (!isClickInsideElement) {
	// 		if (document.getElementsByClassName('filter__active')[0]) {
	// 			this.showFilterActive = true;
	// 			if (this.showFilterActive == true) {
	// 				this.showMenu = false;
	// 				let listClass = document.getElementsByClassName('sub__item');
	// 				let classArray = [];
	// 				let i = 0;
	// 				for (i = 0; i < listClass.length; i++) {
	// 					classArray.push(i);
	// 				}
	// 				classArray.forEach(function (val) {
	// 					document.getElementsByClassName('sub__item')[val].classList.remove('active')
	// 				});
	// 			}
	// 		} else {
	// 			if (this.showMenu == true) {
	// 				this.showMenu = false;
	// 				this.showFilterNavBar = false;
	// 				let listClass = document.getElementsByClassName('sub__item');
	// 				let classArray = [];
	// 				let i = 0;
	// 				for (i = 0; i < listClass.length; i++) {
	// 					classArray.push(i);
	// 				}
	// 				classArray.forEach(function (val) {
	// 					document.getElementsByClassName('sub__item')[val].classList.remove('active')
	// 				});
	// 			}
	// 		}
	// 	}
	// 	// if (!isClickInsideElementOne || !isClickInsideInput) {
	// 	//  	if (this.showFilterLocation == true) {
	// 	//  		this.showFilterLocation = false;
	// 	// 	}
	//  	// }
	// } 
}


export class Resume {
	ResumeId: number;
	ProfileId: number;
	Url: string;
	ResumeFile: string;
}

export class CandidateSearch {
	PageNumber: number;
	PageSize: number;
	SearchValue: string;
	FilterValue: string;
	SelectedSkills: any;
	MinimumExperience: any;
	MaximumExperience: any;
	JobTitle: any;
	CompanyName: any;
	EducatonName: any;
	CertificationName: any;
	SelectedDomains: any;
	CustomerId: any;
	SelectedLocation: any;
	SortBy:any;
}

export class ProfileShare {
	InviteFriendId: number;
	FromuserId: number;
	ToUserId: string;
	Comments: string;
	AppLink: string;
	ToEmailId: string;
	FromEmailId: string;
	ApplicationName: string;
	Image:string;
	SelectedCandidates: CandidateInformation[];
	readonly modules: ReadonlyArray<{}> = []
}

export class contactInfo {
	Infoid: number;
	CustomerId: number;
	UserId: number;
	Fullname: string;
	EmailId: string;
}