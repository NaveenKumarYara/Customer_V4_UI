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
import { GetCompanyLogo } from '../../../models/GetCompanyLogo';
import { GetAboutCompany } from '../../../models/GetAboutCompany';
import { GetCompanyBenefit } from '../../../models/GetCompanyBenefit';
import { CompanySpecialities } from '../../../models/CompanySpecialities';
import { GetCompanyTechnology } from '../../../models/GetCompanyTechnology';
import { GetCompanyWhitePaper } from '../../../models/GetCompanyWhitePaper';
import { GetCompanyNewsInfo } from '../../../models/GetCompanyNewsInfo';


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

    getCompanyBenfits(): Observable<GetCompanyBenefit[]> {
        const url = environment.GetCompanyBenfits;
        return this.http.get<GetCompanyBenefit[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanySpecialities(): Observable<CompanySpecialities[]> {
        const url = environment.CompanySpecialities;
        return this.http.get<CompanySpecialities[]>(url)
            .catch(
                this.handleError
            );
    }

    GetCompanyTechnologies(): Observable<GetCompanyTechnology[]> {
        const url = environment.CompanyTechnologies;
        return this.http.get<GetCompanyTechnology[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyAboutInfo(): Observable<GetAboutCompany[]> {
        const url = environment.GetAboutCompany;
        return this.http.get<GetAboutCompany[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyWhitePapers(): Observable<GetCompanyWhitePaper[]> {
        const url = environment.CompanyWhitePapers;
        return this.http.get<GetCompanyWhitePaper[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyNewsInfo(): Observable<GetCompanyNewsInfo[]> {
        const url = environment.CompanyNewsPapers;
        return this.http.get<GetCompanyNewsInfo[]>(url)
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