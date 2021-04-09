import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { error } from 'util';

@Component({
    selector: 'cm-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    currentView: string = 'Grid';
    showFilterNavBar: boolean = false;
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
    }

    changeView(type) {
        this.currentView = type;
    }

    toggleFilter() {
        this.showFilterNavBar = !this.showFilterNavBar
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
