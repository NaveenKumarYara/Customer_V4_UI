import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd  } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { PjDisc, DiscResult } from '../../models/jobPostInfo';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-steps-step2-personalityType',
  templateUrl: './PersonalityType.component.html',
  styleUrls: ['./PersonalityType.component.css']
})

export class PersonalityTypeComponent implements OnInit, OnDestroy {
  
  selectedPersonType: number;
 // discResult:  DiscResult[];
  checkpersonType: PjDisc[] = [];
  discTestResult: DiscResult[] = [];
  private subscription = new Subscription();
  private subscriptions = new Subscription();
  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService) {
  }

  populateDiscValues() {
    this.appService.getDisc().subscribe(res => {
      this.discTestResult = res;
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
       this.discTestResult.find(iitem => iitem.DISCTestId === option.DISCTestId).checked = option.checked;
      this.appService.addPersonType(this.discTestResult, discTest);
     // this.checkpersonType.push(person);
    } else {
      // for(var i=0 ; i < this.discResult.length; i++) {
      //   if(this.checkpersonType[i].DiscTestId == option.DISCTestId){
      //     this.checkpersonType.splice(i,1);
      //   }
      // }
      this.appService.addPersonType(this.discTestResult, discTest, false);
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
   // this.populateDiscValues();
   // if (localStorage.getItem('jobId') != null) {
    this.discTestResult = this.appService.getPersonTypes();
    if (this.discTestResult.length === 0) {
      this.populateDiscValues();
    }
   // this.discResult = this.appService.getPersonTypes();

    this.subscription = this.appService.personTypeChanged
    .subscribe(
    (disc: DiscResult[]) => {
      // this.discResult.where() = disc;
      this.discTestResult = disc;
  // this.discResult[0].checked=true;
  // this.discTestResult.forEach(element => {
  //   this.ejQualification.QualificationId = element.DISCTestId;
  //   this.ejQualification.QualificationName = element.QualificationName;
  //   this.ejQualificationList.push(this.ejQualification);
  // });
  // this.discResult
  //     }
 // const result = this.discResult.map(o1 => this.discTestResult.some(o2 => o1.checked === o2.checked));
     } );


  this.checkpersonType = this.appService.getaddedPersonTypes();
  this.subscriptions = this.appService.personTypeSingleChanged
    .subscribe(
    (domain: PjDisc[]) => {
      this.checkpersonType = domain;
      }
    );
  //  }
    // if (this.discResult.length === 0) {
    // this.populateDiscValues();
    // }
         //Placed for Scroll to top on next step
         this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0)
      });
  }

  

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptions.unsubscribe();
  }
}
