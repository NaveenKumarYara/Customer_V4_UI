import { Component, OnInit, Input } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/shared/components/services/api.service';
import { CustomerUsers} from '../models/manageJobsInfo'
declare var $: any;
@Component({
  selector: 'app-job-notes',
  templateUrl: './job-notes.component.html',
  styleUrls: ['./job-notes.component.scss']
})
export class JobNotesComponent implements OnInit {
  @Input() showJobForm = ''; // decorate the property with @Input();
  _job: any = null;
  customercontacts:any = []
  selectedUserName:any | undefined
  usersloading?: boolean; 
  getTeammember?:CustomerUsers;
  teammemberslist:any =[];
 selectedComments:any

  selectedUserInput = new Subject<string>();


  get job(): any {
    return this._job
  }

  @Input() set job(value: any) {
    this._job = value;
    if (value) {
      this.getcustomerusers();
    }
  }
 

  panels = ['First', 'Second', 'Third'];
  config = {
    uiColor: '#F0F3F4',
    height: '100%',
    toolbarGroups: [{
      "name": "basicstyles",
      "groups": ["basicstyles"]
    },
    {
      "name": "links",
      "groups": ["links"]
    },
    {
      "name": "paragraph",
      "groups": ["list", "blocks"]
    },
    {
      "name": "document",
      "groups": ["mode"]
    },
    {
      "name": "insert",
      "groups": ["insert"]
    },
    {
      "name": "styles",
      "groups": ["styles"]
    },
    {
      "name": "about",
      "groups": ["about"]
    }
  ],
  // Remove the redundant buttons from toolbar groups defined above.
  removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
  };

  constructor(config: NgbAccordionConfig,private apiService:ApiService) {
		// customize default values of accordions used by this component tree
		config.closeOthers = true;
		config.type = 'info';
	}

  ngOnInit(): void {
    console.log("gob",this.job)
    console.log("selectedComments",this.selectedComments)
  
  }
  titleCase(str:any) {
    return str.toLowerCase().split(' ').map(function(word:any) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  } 

  addTeammembers() {
    console.log("selected",this.selectedUserName)
  
    // const newDomain = new CustomerUsers();
    // newDomain.FirstName = this.selectedUserName;
    // if (this.selectedUserName !== undefined) {
    // const check = this.teamExists(this.getTeammember, this.teammemberslist);
    // if (check === false) {
    // }
    this.teammemberslist.push(...this.customercontacts.filter((v:any) => v.UserId === this.selectedUserName))
    console.log("Added",this.teammemberslist)
     // this.selectedUserName = '';
    //  $('#teamMbr').val('');
  
  }

  
  changeTeam(val:any) {
    // this.getTeammember = val;
    //this.GetJobAssigned(val.UserId,val.Email);
  }
  getcustomerusers(){
  console.log("gob2",this.job)
   return this.apiService.GetProfileService("/api/GetCustomerUsers?CustomerId=",this.job.CustomerId).subscribe((res:any) => {
     //this.customercontacts = res;
     console.log("customerName",res)
     this.customercontacts=res

       this.customercontacts =  res.filter((i:any) => { 
          // if(i.FirstName !="Invited" && i.IsRemove!=true)
            return i.FirstName= this.titleCase(i.FirstName) + ' ' + this.titleCase(i.LastName) + ' - ' + this.titleCase(i.RoleName); 
         })
      });
 }

}
