import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { AppService } from '../../../../app.service';
import { ClientModel } from '../../models/jobPostInfo';
import { AddClient } from '../../../../../models/jobskills.model';
@Component({
  selector: 'app-steps-step1-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  // providers: [AppService]
})
export class ClientsComponent implements OnInit {

  clientsList: Observable<any>;
  clientInput = new Subject<string>();
  clientLoading = false;
  selectedClient: ClientModel;
  selectClient: string;
  suggestClients: string[];
  customerId: any;
  constructor(private appService: AppService) {
    this.customerId = parseInt(JSON.parse(sessionStorage.getItem('userData')).CustomerId, 10);
   }


  addClient(val) {
    const  client = new AddClient();
     client.ClientName = val;
    //  // this.selectedSkillName = val;
    //  // this.selectedSkillName = this.skill.nativeElement.value;
    //  $('#skills').val('1');
      //  localStorage.setItem('client', val);
      return { name: client.ClientName , tag: true };
  }
  updateClient(val) {
    // this.selectClient = val.ClientName === undefined ? val.name : val.ClientName;
    if (val.ClientName === undefined) {
      this.selectClient = val.name;
      this.selectedClient.ClientId = 0;
      this.selectedClient.ClientName = val.name;
    } else {
      this.selectClient = val.ClientName;
      this.selectedClient  = val;
    }
    localStorage.setItem('client', this.selectClient);
    this.appService.updateClient(this.selectedClient);
   }
  private searchClients() {
    this.clientsList = concat(of([]),
    this.clientInput.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.clientLoading = true),
      switchMap(term => this.appService.searchClient(this.customerId, false, term).pipe(
        catchError(() => of([])), // empty list on error
        tap(() => this.clientLoading = false)
      ))
    )
  );
}
suggestedClients() {
  this.appService.searchClient(this.customerId, true).subscribe(res => {
    this.suggestClients = res;
    // this.discResult.forEach(cc => cc.checked = false);
  });
}

  ngOnInit() {
    this.searchClients();
    this.suggestedClients();
    this.appService.currentClient.subscribe(x => this.selectedClient = x);
    // if (this.selectedClient != null) {
    //   this.updateClient(this.selectedClient);
    // }
    // this.selectClient = localStorage.getItem('clientName');
    this.selectClient =  this.selectedClient.ClientName;
    if (this.selectClient === undefined && localStorage.getItem('jobId') != null) {
      this.appService.getDraftClient(parseInt(localStorage.getItem('jobId'), 10)).subscribe(
        x => {
          this.selectedClient = x;
          this.selectClient = x.ClientName;
          localStorage.setItem('client', this.selectClient);
          // this.appService.clientModel.next(this.selectedClient);
        // this.appService.updateClient(this.selectedClient);
        }
        );
        this.appService.clientModel.next(this.selectedClient);
    }
    // if (this.selectCategory === undefined && localStorage.getItem('jobId') != null) {
    //   this.appService.getDraftCategory(parseInt(localStorage.getItem('jobId'), 10)).subscribe(
    //     x => this.selectCategory = x.Category);
    // }
  }
  // ngAfterViewInit() {
  //   this.appService.currentClient.subscribe(x => this.selectedClient = x);
  //   this.selectClient = this.selectedClient.ClientName;
  // }
  // ngAfterViewChecked() {
  //   this.appService.currentClient.subscribe(x => this.selectedClient = x);
  //   if (this.selectedClient.ClientName === null || this.selectedClient.ClientName === undefined) {
  //   this.selectClient = localStorage.getItem('clientName');
  //   // localStorage.setItem('clientId', this.selectedClient.ClientId.toString());
  //   } else {
  //     // localStorage.removeItem('clientName');
  //     // localStorage.setItem('clientId', this.selectedClient.ClientId.toString());
  //     this.selectClient = this.selectedClient.ClientName;
  //      localStorage.setItem('clientName', this.selectClient );
  //     // this.updateClient(this.selectedClient);
  //   }
  // }
}
