import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
declare var $: any;

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
	userId: any = null;
	candidates: any[] = [];
	candidatesLoading: boolean = false;
	currentPage: number = 1;
	totalCandidatesCount: number = 0;
	totalPageCount: number = 1;
	pageCount: number = 20;
	selectedCandidate: any = null;
	selectedIndex: number;
	showDetail: boolean = false;
	currentFilterType: string = '';
	isFilterDataLoading: boolean = false;
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

	constructor(private appService: AppService) {
		this.selectedIndex = 0;
	}

	ngOnInit() {
		this.customer = JSON.parse(sessionStorage.getItem('userData'));
		this.customerId = this.customer.CustomerId;
		this.userId = this.customer.UserId;
		this.getCandidates();

		$(document).on('click touchend', function (e) {
			if (!$(".revamp__filter__sidebar__box .scroll-box > ul").is(e.target) && $(".revamp__filter__sidebar__box .scroll-box > ul").has(e.target).length == 0 && !$(".revamp__filter__sidebar__box .btn-filter").is(e.target) && $(".revamp__filter__sidebar__box .btn-filter").has(e.target).length == 0) {
				$('.revamp__filter__sidebar__box').removeClass('full');
				$('.revamp__filter__sidebar__box').removeClass('show');
				$('.revamp__filter__sidebar__box').removeClass('big');
				$('.data-grid-view').removeClass('open');
				$('.data-grid-table').removeClass('open');
				$('.sub__item').removeClass('active');
			}
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

	showJobPrview(index) {
		this.showDetail = true;
		this.selectedCandidate = this.candidates[index];
		this.selectedIndex = index;
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

	getCandidates() {
		this.candidatesLoading = true;
		this.appService.getCandidates(this.customerId, this.userId, this.currentPage, this.pageCount).subscribe(
			(res: any) => {
				if (res != null) {
					if (res.Candidates.length > 0) {
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

	onPageChange(pageValue) {
		this.currentPage += pageValue;
		this.getCandidates();
	}
}
