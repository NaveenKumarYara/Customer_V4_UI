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

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.getFilterData('JobType');
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
}
