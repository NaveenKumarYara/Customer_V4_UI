import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewContainerRef, HostListener } from '@angular/core';
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

@Component({
	selector: 'cm-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
	currentView: string = 'Grid';
	showFilterNavBar: boolean = false;
	showMenu: boolean = false;
	customer: any = null;
	customerId: any = null;
	searchText: any = null;
	userId: any = null;
	candidates: CandidateInformation[] = [];
	candidatesLoading: boolean = false;
	currentPage: number = 1;
	totalCandidatesCount: number = 0;
	totalPageCount: number = 1;
	pageCount: number = 20;
	selectedCandidate: any = null;
	selectedIndex: number;
	fileType = new Resume();
	fileExt: any;
	showDetail: boolean = false;
	skilltitleloading: boolean;
	jobsLoading: boolean;
	currentFilterType: string = '';
	isFilterDataLoading: boolean = false;
	statusid: number = 0;

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
	showFilterActive: boolean;

	isJobTypeShown: boolean;
	isSkillShown: boolean;
	isExperienceShown: boolean;

	skillList: any;
	selectedSkillName: any;
	selectedskillinput = new Subject<string>();
	selectedDomainInput = new Subject<string>();
	MinimumExperience: any;
	MaximumExperience: any;


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
	matchingParameterDetails: MatchingParameterDetails;
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
	selectedSkills: any;
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
	constructor(public dialogRef: MatDialogRef<DetailsComponent>, private appService: AppService, private readonly apiService: ApiService,
		private jobdetailsservice: JobdetailsService, private toastr: ToastsManager, private _vcr: ViewContainerRef,
		private dialog: MatDialog,
		private modalService: NgbModal, private readonly storageService: StorageService, private settingsService: SettingsService
	) {
		const swal = require('sweetalert2');
		this.selectedIndex = 0;
		// this.searchJob.pipe(
		// 	debounceTime(100),
		// 	distinctUntilChanged())
		// 	.subscribe(value => {
		// 		debugger;
		// 	  this.getActiveJobs();
		// 	});
	}

	ngOnInit() {
		this.initInitialState();
	}

	initInitialState() {
		//this.keywordSearchValidators();
		this.customer = JSON.parse(sessionStorage.getItem('userData'));
		this.customerId = this.customer.CustomerId;
		this.userId = this.customer.UserId;
		this.showDetail = false;
		this.getCandidates();
		this.getSkills();
		this.getDomains();
		// this.keywordSearchGroup.get('searchValue').valueChanges.pipe(debounceTime(600))
		// 	.subscribe(res => {
		// 		this.keywordSearchGroup.get('searchValue').setValue(res);
		// 		this.getCandidates();
		// 	});
		this.AddUser = false;
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
						debugger;
						let y = data;
						this.skilltitleloading = false;
					})
				))
			)
		);
		debugger;
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
						debugger;
						let y = data;
						this.domainLoading = false;
					})
				))
			)
		);
		debugger;
		let k = 10;
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

	shareSidePanel() {
		this.GetContacts();
		this.clearTeamMemebers();
		this.getcustomerusers();
		this.shareJobSidepanel = true;
	}

	hideApplySidePanel() {
		this.applyJobSidePanelShow = false;
	}

	hideShareSidePanel() {
		this.shareJobSidepanel = false;
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
		if (percentage < 50) {
			swal(
				{
					title: 'The candidate has not completed the profile',
					showConfirmButton: true,
					showCancelButton: true,
					type: "info",
					confirmButtonColor: '#66dab5',
					cancelButtonColor: '#FF0000',
					confirmButtonText: 'View',
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
			const url = '/app-view-candidateprofile-detail';
			window.open(url, "_blank");
		}
	}
	getActiveJobs() {
		debugger;
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
				debugger;
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
		debugger;
		//let candidates = this.candidates.filter(x => x.IsSelected);
		this.applyJobToSelectedCandidates();

	}
	applyJobToSelectedCandidates() {
		debugger;
		let candidates = this.candidates.filter(x => x.IsSelected);
		let selectedJobs = this.activeJobs.filter(x => x.IsSelected);
		if (candidates.length > 0) {
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
							type: "error",
							confirmButtonColor: '#66dab5',
							cancelButtonColor: '#FF0000',
							confirmButtonText: 'View',
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
					type: "error",
					confirmButtonColor: '#66dab5',
					cancelButtonColor: '#FF0000',
					confirmButtonText: 'View',
					cancelButtonText: 'No'
				}).then((result) => {
					this.initInitialState();
				});
		}

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
		debugger;
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
		// 	debugger;
		// 	let filters = JSON.parse(this.storageService.get('CurrentFilter'));
		// 	debugger;
		// 	this.filter = filters;
		// 	this.getCandidates();
		// });
	}
	ShareProfile() {
		debugger;
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
						confirmButtonText: 'View',
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
					type: "error",
					confirmButtonColor: '#66dab5',
					cancelButtonColor: '#FF0000',
					confirmButtonText: 'View',
					cancelButtonText: 'No'
				}).then((result) => {
					this.initInitialState();
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
		this.showFilterNavBar = false;
		this.showMenu = false;
		this.getCandidates();
	}
	selectSkills() {
		console.log(this.selectedSkills);
		if (this.selectedSkills == null) {
			this.selectedSkillCount = 0;
		}
		else {
			this.selectedSkillCount = 1;
		}
		this.searchCandidates();
	}
	selectDomians() {
		if (this.selectedDomains == null) {
			this.selectedDomainCount = 0;
		}
		else {
			this.selectedDomainCount = this.selectedDomains.length;
		}
		this.searchCandidates();
	}
	selectExperience() {
		debugger;
		if (this.MinimumExperience == 0 || this.MaximumExperience == 0) {
			this.selectedExperienceCount = 0;
		}
		else {
			this.selectedExperienceCount = 1;
		}
		this.searchCandidates();
	}
	selectJobTitle() {
		debugger;
		if (this.jobTitle == null || this.jobTitle == '') {
			this.selectedJobTitleCount = 0;
		}
		else {
			this.selectedJobTitleCount = 1;
		}
		this.searchCandidates();
	}
	selectCompany() {
		debugger;
		if (this.companyName == null || this.companyName == '') {
			this.selectedCompanyCount = 0;
		}
		else {
			this.selectedCompanyCount = 1;
		}
		this.searchCandidates();
	}
	selectEducation() {
		if (this.educationName == null || this.educationName == '') {
			this.selectedEdcationCount = 0;
		}
		else {
			this.selectedEdcationCount = 1;
		}
		this.searchCandidates();
	}
	selectCertification() {
		if (this.certificationName == null || this.certificationName == '') {
			this.selectedCertificationCount = 0;
		}
		else {
			this.selectedCertificationCount = 1;
		}
		this.searchCandidates();
	}
	showJobType() {
		debugger;
		this.showMenu = true;
		this.isJobTypeShown = !this.isJobTypeShown;
		this.isSkillShown = false;
		this.isExperienceShown = false;
		this.isJobTitleShown = false;
		this.isDomainShown = false;
	}
	showSkill() {
		debugger;
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
		debugger;
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
		debugger;
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
		debugger;
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
		debugger;
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
		debugger;
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
		debugger;
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

	findCandidates() {
		this.cancel();
		this.getCandidates();
	}
	getCandidates() {
		debugger;
		this.candidatesLoading = true;
		this.customer = JSON.parse(sessionStorage.getItem('userData'));
		this.customerId = this.customer.CustomerId;

		let candidateSearch = new CandidateSearch();
		candidateSearch.PageNumber = this.currentPage;
		candidateSearch.PageSize = this.pageCount;
		candidateSearch.SearchValue = this.searchValue;
		candidateSearch.SelectedSkills = this.selectedSkills;
		candidateSearch.MinimumExperience = this.MinimumExperience;
		candidateSearch.MaximumExperience = this.MaximumExperience;
		candidateSearch.JobTitle = this.jobTitle;
		candidateSearch.CompanyName = this.companyName;
		candidateSearch.EducatonName = this.educationName;
		candidateSearch.CertificationName = this.certificationName;
		candidateSearch.SelectedDomains = this.selectedDomains;
		candidateSearch.CustomerId = this.customerId;
		candidateSearch.FilterValue = JSON.stringify(this.filter);


		this.appService.getCandidates(candidateSearch).subscribe(
			(res: any) => {
				if (res != null) {
					if (res.Candidates != null && res.Candidates.length > 0) {
						this.candidates = res.Candidates;
						this.totalCandidatesCount = res.TotalRecordsCount;
						if (this.totalCandidatesCount % this.pageCount == 0)
							this.totalPageCount = this.totalCandidatesCount / this.pageCount;
						else {
							this.totalPageCount = Number((this.totalCandidatesCount / this.pageCount).toFixed());
						}
					}
					else
						this.candidates = [];
				}
				else
					this.candidates = [];
				this.candidatesLoading = false;
			},
			error => {
				debugger;
				console.log('Error occurred!');
				this.candidatesLoading = false;
			});
	}

	makeAllFalse() {

	}

	closeApplyJobWindow() {
		this.applyJobSidePanelShow = false;
	}

	// @HostListener('document:click', ['$event'])
	// onClick(event) {
	// 	var ignoreClickOnMeElement = document.getElementById('show_main_navigation');
	// 	var ignoreClickOnMeElementOne = document.getElementById('filter_by_tech');
	// 	var ignoreClickOnInput = document.getElementById('text_search');
	// 	var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
	// 	var isClickInsideElementOne = ignoreClickOnMeElementOne.contains(event.target);
	// 	var isClickInsideInput = ignoreClickOnInput.contains(event.target);
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
	// 	if (!isClickInsideElementOne || !isClickInsideInput) {
	// 		if (this.showFilterLocation == true) {
	// 			this.showFilterLocation = false;
	// 		}
	// 	}
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