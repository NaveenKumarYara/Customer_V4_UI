import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/shared/components/services/api.service';

@Component({
  selector: 'app-find-a-candidate',
  templateUrl: './find-a-candidate.component.html',
  styleUrls: ['./find-a-candidate.component.scss'],
  providers: [ApiService]
})
export class FindACandidateComponent implements OnInit {
  viewLayout = 'grid';
  fstart:number=1;
  flast:any;
  candidates: any = [];
  currentPage: number = 1;
	totalCandidatesCount: number = 0;
	totalPageCount: number = 1;
	pageCount: number = 16;
  selectedSkills: any ;
  showCardCarousel:boolean = false;
  np:number = 1;
  CandidateDetails:any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    center:false,
    margin: 20,
    items: 1,
    navText: ['<span class="mdi mdi-chevron-left"></span>', '<span class="mdi mdi-chevron-right"></span>'],
    nav: true
  }
  customer: any;
  searchValue: undefined;
  constructor(private _service : ApiService) {
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
    this.getCandidates();
  }

  ngOnInit(): void {
    this.viewLayout = 'grid';
    window.resizeBy(1,2);
  }

  showCardCarouselHandler(cand: any) {
    this.showCardCarousel = true;
    this.CandidateDetails = cand; 
  }

  getCandidates() {



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
		candidateSearch.JobTitle = undefined;
		candidateSearch.CompanyName = undefined;
		// candidateSearch.EducatonName = this.educationName;
		// candidateSearch.CertificationName = this.certificationName;
		candidateSearch.SelectedLocation = undefined;
		//candidateSearch.SelectedDomains = this.selectedDomains;
		candidateSearch.CustomerId = this.customer.CustomerId;
		//candidateSearch.FilterValue = JSON.stringify(this.filter);
        candidateSearch.SortBy = 0;
		this._service.getNewCandidates(candidateSearch).subscribe(
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
			},
			error => {
				//debugger;
				console.log('Error occurred!');

			});
	}


  showCardCarouselHideHandler() {
    this.showCardCarousel = false;
  }

  listCount(count:any) {
    this.fstart = count;
    
    this.fstart = this.fstart * 6 - 6;
    if(this.fstart == 0)
    {
      this.fstart = 1;
    }
    this.flast = count * 6;
    if (this.flast > 10) {
      this.flast = 10;
    }
  }

  
  layoutView(name:string){
    this.viewLayout = name;
  }
}


export class CandidateSearch {
	PageNumber: number | undefined;
	PageSize: number | undefined;
	SearchValue: string | undefined;
	FilterValue!: string;
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