import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { error } from 'util';
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

	constructor(private appService: AppService) { }


	ngOnInit() {
		this.customer = JSON.parse(sessionStorage.getItem('userData'));
		this.customerId = this.customer.CustomerId;
		this.userId = this.customer.UserId;
		//this.getFilterData('JobType');
		this.getCandidates();

		$(document).on('click touchend', function(e){
			if (!$(".revamp__filter__sidebar__box .scroll-box > ul").is(e.target) && $(".revamp__filter__sidebar__box .scroll-box > ul").has(e.target).length==0 && !$(".revamp__filter__sidebar__box .btn-filter").is(e.target) && $(".revamp__filter__sidebar__box .btn-filter").has(e.target).length==0)
  		{
				$('.revamp__filter__sidebar__box').removeClass('full');
				$('.revamp__filter__sidebar__box').removeClass('show');
				$('.revamp__filter__sidebar__box').removeClass('big');
				$('.data-grid-view').removeClass('open');
				$('.data-grid-table').removeClass('open');
				$('.sub__item').removeClass('active');
			}
		});
	}

	changeView(type) {
		this.currentView = type;
	}

	toggleFilter() {
	 	this.showFilterNavBar = !this.showFilterNavBar
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

	getFilterData(filterType) {
		this.appService.getFilterDataInCM(filterType).subscribe(
			(res: any) => {
				console.log(res);
			},
			error => {
				console.log('Error occurred!');
			});
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
				console.log(res);
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
