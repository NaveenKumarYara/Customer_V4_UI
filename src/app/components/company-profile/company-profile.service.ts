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
import {  GetCompanyPartner } from '../../../models/GetCompanyPartner';
import {  GetCompanyCulture } from '../../../models/GetCompanyCulture';
import { GetCompanyCertification } from '../../../models/GetCompanyCertification';
import { GetCompanyAchievement } from '../../../models/GetCompanyAchievement';


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

    getCompanyProfile(customerId:number): Observable<CompanyProfile> {
        const url = environment.CompanyProfileBasicInfo+ 'customerId='+customerId ;
        return this.http.get<CompanyProfile>(url)            
            .catch(
                this.handleError
            );
    }

    getCompanyProfileOtherInfo(customerId:number): Observable<CompanyProfileOtherIno> {
        const url = environment.CompanyProfileOtherInfo+ 'customerId='+customerId ;
        return this.http.get<CompanyProfileOtherIno>(url)
            .catch(
                this.handleError
            );
    }


    getCompanyCustomerLocationInfo(customerId:number): Observable<CustomerLocationInfo[]> {
        const url = environment.CompanyProfileLocationInfo+ 'customerId='+customerId ;
        return this.http.get<CustomerLocationInfo[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyBenfits(customerId:number): Observable<GetCompanyBenefit[]> {
        const url = environment.GetCompanyBenfits+ 'customerId='+customerId+'&companyBenefitId=0';
        return this.http.get<GetCompanyBenefit[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanySpecialities(customerId:number): Observable<CompanySpecialities[]> {
        const url = environment.CompanySpecialities+ 'customerId='+customerId+'&companySpecialityId=0';
        return this.http.get<CompanySpecialities[]>(url)
            .catch(
                this.handleError
            );
    }

    GetCompanyTechnologies(customerId:number): Observable<GetCompanyTechnology[]> {
        const url = environment.CompanyTechnologies+ 'customerId='+customerId+'&companyTechnologyId=0';
        return this.http.get<GetCompanyTechnology[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyAboutInfo(customerId:number): Observable<GetAboutCompany[]> {
        const url = environment.GetAboutCompany+ 'customerId='+customerId;
        return this.http.get<GetAboutCompany[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyWhitePapers(customerId:number): Observable<GetCompanyWhitePaper[]> {
        const url = environment.CompanyWhitePapers+ 'customerId='+customerId;
        return this.http.get<GetCompanyWhitePaper[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyNewsInfo(customerId:number): Observable<GetCompanyNewsInfo[]> {
        const url = environment.CompanyNewsPapers+ 'customerId='+customerId+'&companyNewsInfoId=0';
        return this.http.get<GetCompanyNewsInfo[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyAchivements(customerId:number): Observable<GetCompanyAchievement[]> {
        const url = environment.ComapnyAchivements + 'customerId='+customerId+'&companyAchievementId=0';
        return this.http.get<GetCompanyAchievement[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyCultures(customerId:number): Observable<GetCompanyCulture[]> {
        const url = environment.CompanyCultures+ 'customerId='+customerId+'&companyCultureId=0';
        return this.http.get<GetCompanyCulture[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyCertifications(customerId:number): Observable<GetCompanyCertification[]> {
        const url = environment.CompanyCertifications+ 'customerId='+customerId+'&companyCertificationId=0';
        return this.http.get<GetCompanyCertification[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyPartnerShips(customerId:number): Observable<GetCompanyPartner[]> {
        const url = environment.CompanyPartnerships+ 'customerId='+customerId+'&companyPartnerId=0';
        return this.http.get<GetCompanyPartner[]>(url)
            .catch(
                this.handleError
            );
    }
    
    getCompanyLogo(customerId:number): Observable<GetCompanyLogo> {
        const url = environment.GetCompanyLogo+ 'customerId='+customerId;
        return this.http.get<GetCompanyLogo>(url)
            .catch(
                this.handleError
            );
    }
}