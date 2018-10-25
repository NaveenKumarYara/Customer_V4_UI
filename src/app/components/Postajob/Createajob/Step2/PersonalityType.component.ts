import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { PjDisc, DiscResult } from '../../models/jobPostInfo';

@Component({
  selector: 'app-steps-step2-personalityType',
  templateUrl: './personalityType.component.html',
  styleUrls: ['./personalityType.component.css']
})

export class PersonalityTypeComponent implements OnInit, OnDestroy {
  selectedPersonType: number;
  checkpersonType: PjDisc[] = [];
  discResult: DiscResult[] = [];
  private subscription = new Subscription();
  private subscriptions = new Subscription();
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  populateDiscValues() {
    this.appService.getDisc().subscribe(res => {
      this.discResult = res;
      // this.discResult.forEach(cc => cc.checked = false);
    });
  }

  // personType(val) {
  //   const person = new PjDisc;
  //   person.DiscTestId = val;
  //   this.appService.addPersonType(person);
  //   this.checkpersonType.push(person);
  // }
  onCheckboxChange(option, event) {
    const discTest = new PjDisc;
    discTest.DiscTestId = option.DISCTestId;
      option.checked = event.target.checked;
    if (event.target.checked) {
      // this.checkedList.push(option.id);
      // const person = new PjDisc;
      // person.DiscTestId = option.DISCTestId;
      // let discTest= new PjDisc;
      // discTest.DiscTestId=option.DISCTestId;
      // option.checked = event.target.checked;
       this.discResult.find(iitem => iitem.DISCTestId === option.DISCTestId).checked = option.checked;
      this.appService.addPersonType(this.discResult, discTest);
     // this.checkpersonType.push(person);
    } else {
      // for(var i=0 ; i < this.discResult.length; i++) {
      //   if(this.checkpersonType[i].DiscTestId == option.DISCTestId){
      //     this.checkpersonType.splice(i,1);
      //   }
      // }
      this.appService.addPersonType(this.discResult, discTest, false);
    }
    console.log(this.checkpersonType);
    }
  // onClicked(option, event) {
  //   console.log("event  " + this.xyzlist.length);
  //   console.log("event  checked" + event.target.checked);
  //   console.log("event  checked" + event.target.value);
  //   for (var i = 0; i < this.discResult.length; i++) {
  //       console.log("test --- " + this.discResult[i].Id;
  //       if (this.discResult[i].DiscTestId == event.target.value) {
  //           //this.discResult[i].checked = event.target.checked;
  //       }
  //       console.log("after update of checkbox" + this.discResult[i].checked);

  //   }
  // isSelected(value: number): boolean {
  //   return this.selectedTopics.indexOf(value) >= 0;
  // }

  // onChange(value: string, checked: boolean) {
  //   console.log(value, checked);
  //   if (checked) {
  //     this.selectedTopics.push(value);
  //   } else {
  //     let index = this.selectedTopics.indexOf(value);
  //     this.selectedTopics.splice(index, 1);
  //   }
  //   console.log(this.selectedTopics);
  // }

  ngOnInit() {
   // if (localStorage.getItem('jobId') != null) {
    this.discResult = this.appService.getPersonTypes();

   // this.discResult = this.appService.getPersonTypes();

    this.subscription = this.appService.personTypeChanged
    .subscribe(
    (disc: DiscResult[]) => {
      // this.discResult.where() = disc;
      this.discResult = disc;
  // this.discResult[0].checked=true;
      }
    );


  this.checkpersonType = this.appService.getaddedPersonTypes();
  this.subscriptions = this.appService.personTypeSingleChanged
    .subscribe(
    (domain: PjDisc[]) => {
      this.checkpersonType = domain;
      }
    );
  //  }
    if (this.discResult.length === 0) {
    this.populateDiscValues();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptions.unsubscribe();
  }
}
