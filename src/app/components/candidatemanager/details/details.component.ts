import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cm-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    currentView: string = 'Grid';
    showFilterNavBar: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    changeView(type) {
        this.currentView = type;
    }

    toggleFilter() {
        this.showFilterNavBar = !this.showFilterNavBar
    }
}
