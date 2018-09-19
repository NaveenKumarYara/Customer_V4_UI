import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CompanyBasicInfo } from '../../../models/CompanyBasicInfo';
import { OtherInfo } from '../../../models/OtherInfo';
import { CompanyLocations} from '../../../models/CompanyLocations';


@Injectable()
export class CompanyProfileService {

    constructor(private http: HttpClient) {
    }


    private companylocations: CompanyLocations[] = [];
    companylocationsChanged = new Subject<CompanyLocations[]>();
    
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getCompanyBasicInfo(): Observable<CompanyBasicInfo> {
        const url = environment.CompanyBasicInfo;
        return this.http.get<CompanyBasicInfo>(url)
            .debounceTime(1000)
            .catch(
                this.handleError
            );
    }

    getCompanyOtherInfo(): Observable<OtherInfo> {
        const url = environment.GetOtherInfo;
        return this.http.get<OtherInfo>(url)
            .debounceTime(1000)
            .catch(
                this.handleError
            );
    }

    private listcount = new BehaviorSubject(6);
    currentlistcount = this.listcount.asObservable();

    getCompanyLocations(count: number): Observable<CompanyLocations[]> {
        const url = environment.CompanyLocations;
        return this.http.get<CompanyLocations[]>(url)
            .debounceTime(1000)
            .catch(
                this.handleError
            );
    }

  
 
  
    
    updateJobListCount(updatedtotal: number) {
      this.listcount.next(updatedtotal);
    }
    

   
 
}