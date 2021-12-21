import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AppService } from '../../../app.service';
declare var $: any;
import * as FileSaver from 'file-saver';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { ApiService } from "../../../shared/services/api.service/api.service";
import { JobdetailsService } from '../../jobdetails/jobdetails.service';
import { MatchingParameterDetails } from '../../jobdetails/models/jobdetailsprofile';
import { ViewCandidateprofileComponent } from '../../jobdetails/view-jobdetails/viewjobdetails-candidate-profile/view-candidateprofile/view-candidateprofile.component';
import swal from 'sweetalert2';
import { BulkApplyInvite, CandidateInformation } from '../../../shared/models';
import { LoadActiveProjectsComponent } from '../load-active-projects/load-active-projects.component';
import { JobInfo } from '../../../../models/GetJobDetailCustomer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';

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
	currentFilterType: string = '';
	isFilterDataLoading: boolean = false;
	statusid: number = 0;
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
	searchValue: any = null

	jobList: Observable<string[]>;

	jobInput = new Subject<string>();
	jobsLosding: boolean;
	selectedJobId: any;

	constructor(private appService: AppService, private readonly apiService: ApiService,
		private jobdetailsservice: JobdetailsService, private toastr: ToastsManager, private _vcr: ViewContainerRef,
		private dialog: MatDialog,
		private modalService: NgbModal
	) {
		const swal = require('sweetalert2');
		this.selectedIndex = 0;
	}

	ngOnInit() {
		this.initInitialState();
	}

	initInitialState() {
		this.keywordSearchValidators();
		this.customer = JSON.parse(sessionStorage.getItem('userData'));
		this.customerId = this.customer.CustomerId;
		this.userId = this.customer.UserId;
		this.showDetail = false;
		this.getCandidates();
		this.getActiveJobs();
		this.keywordSearchGroup.get('searchValue').valueChanges.pipe(debounceTime(600))
			.subscribe(res => {
				this.keywordSearchGroup.get('searchValue').setValue(res);
				this.getCandidates();
			});
	}

	next() {
		++this.selectedIndex;
	}

	previous() {
		if (this.selectedIndex < 0) {
			--this.selectedIndex;
		}
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


	searchFunc(val) {

		if (val != '') {
			this.searchValue = val;
			this.getCandidates();
		}
		else {
			this.searchValue = null;
			this.getCandidates();
		}
	}


	getCandidates() {
		this.candidatesLoading = true;
		// this.isKeywordSearch = this.keywordSearchGroup.get('isKeywordSearch').value;
		if (this.searchValue != null) {
			const params = {
				//cId: this.customerId,
				//uId: this.userId,
				pNo: this.currentPage,
				rows: this.pageCount,
				// so: '',
				//isKeywordSearch: this.isKeywordSearch,
				searchValue: this.searchValue,
			};
			this.appService.getCandidates(params).subscribe(
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
					console.log('Error occurred!');
					this.candidatesLoading = false;
				});
		}
		else {
			const params = {
				//cId: this.customerId,
				//uId: this.userId,
				pNo: this.currentPage,
				rows: this.pageCount,
				// so: '',
				//isKeywordSearch: this.isKeywordSearch,
				//searchValue: this.searchValue,
			};
			this.appService.getCandidates(params).subscribe(
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
					console.log('Error occurred!');
					this.candidatesLoading = false;
				});
		}


	}


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
					title: 'Candidate haven"t completed profile',
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
						//this.router.navigateByUrl('/app-view-candidateprofile-detail');
						const url = '/app-view-candidateprofile-detail';
						window.open(url, "_blank");

					}




				});
		}
		else {
			localStorage.setItem("cprofileId", profileId);
			localStorage.setItem("cuserId", userId);
			//this.router.navigateByUrl('/app-view-candidateprofile-detail');
			const url = '/app-view-candidateprofile-detail';
			window.open(url, "_blank");
		}
	}

	getActiveJobs() {
		this.jobList = concat(
			of([]), // default items
			this.jobInput.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				tap(() => this.jobsLosding = true),
				switchMap(term => this.appService.getActiveJobs(term).pipe(
					catchError(() => of([])), // empty list on error
					tap(() => this.jobsLosding = false)
				))
			)
		);
		// this.appService.getActiveJobs().subscribe(
		// 	(res: any) => {
		// 		debugger;
		// 		this.jobList = res;
		// 	},
		// 	error => {
		// 		console.log('Error occurred!');
		// 		this.candidatesLoading = false;
		// 	});
	}

	keywordSearchValidators() {
		this.keywordSearchGroup = new FormGroup({
			isKeywordSearch: new FormControl('0'),
			searchValue: new FormControl(' ')
		});
	}

	shareJobToSelectedCandidates() {
		debugger;
		let candidates = this.candidates.filter(x => x.IsSelected);

	}

	applyJobToSelectedCandidates() {
		debugger;
		let candidates = this.candidates.filter(x => x.IsSelected);
		let selectedJob = this.selectedJobId;
		let bulkApply: BulkApplyInvite = { JobId: selectedJob, SelectedCandidates: candidates };
		bulkApply.JobId
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
						this.initInitialState();
					});
				this.initInitialState();
			},
			error => {
				console.log('Error occurred!');
				this.candidatesLoading = false;
				swal(
					{
						title: 'Eror while applying for a job.',
						showConfirmButton: false,
						showCancelButton: true,
						type: "error",
						confirmButtonColor: '#66dab5',
						cancelButtonColor: '#FF0000',
						confirmButtonText: 'View',
						cancelButtonText: 'Cancel'
					}).then((result) => {
						this.initInitialState();
					});
			});

	}
	// shareJob() {
	// 	const modalRef = this.modalService.open(LoadActiveProjectsComponent, {
	//         size: 'sm',
	//         //keyboard: false,
	//         //backdrop: 'static'
	//     });
	//     modalRef.result.then(res => {
	//         if (res) {
	//             //this.initDataSource();
	//         }
	//     }).catch(() => { });
	// }

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
}


export class Resume {
	ResumeId: number;
	ProfileId: number;
	Url: string;
	ResumeFile: string;
}