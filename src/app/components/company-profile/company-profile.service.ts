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
import { CompanyProfile } from '../../../models/companyprofile';
import { CompanyProfileOtherIno } from '../../../models/companyprofile-otherinfo';
import { CustomerLocationInfo } from '../../../models/customerlocationinfo';
import {GetCompanyLogo} from '../../../models/GetCompanyLogo';


@Injectable()
export class CompanyProfileService {

    constructor(private http: HttpClient) {
    }
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getCompanyProfile(): Observable<CompanyProfile> {
        const url = environment.CompanyProfileBasicInfo;
        return this.http.get<CompanyProfile>(url)            
            .catch(
                this.handleError
            );
    }

    getCompanyProfileOtherInfo(): Observable<CompanyProfileOtherIno> {
        const url = environment.CompanyProfileOtherInfo;
        return this.http.get<CompanyProfileOtherIno>(url)
            .catch(
                this.handleError
            );
    }


    getCompanyCustomerLocationInfo(): Observable<CustomerLocationInfo[]> {
        const url = environment.CompanyProfileLocationInfo;
        return this.http.get<CustomerLocationInfo[]>(url)
            .catch(
                this.handleError
            );
    }
    
    getCompanyLogo(): Observable<GetCompanyLogo> {
        const url = environment.GetCompanyLogo;
        return this.http.get<GetCompanyLogo>(url)
            .catch(
                this.handleError
            );
    }
}