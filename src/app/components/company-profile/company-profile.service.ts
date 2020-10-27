import { Injectable } from '@angular/core';
import { Http, ResponseContentType, URLSearchParams, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { BehaviorSubject } from 'rxjs';

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
import { SettingsService } from '../../../settings/settings.service';


@Injectable()
export class CompanyProfileService {
    // baseUrll = 'http://v1.tenendus.com:1020/';
    constructor(private http: HttpClient,private _http: Http, private settingsService: SettingsService) {
    }
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getCompanyProfile(customerId:number): Observable<CompanyProfile> {
        const url = this.settingsService.settings.CompanyProfileBasicInfo+ 'customerId='+customerId ;
        return this.http.get<CompanyProfile>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyProfileOtherInfo(customerId:number): Observable<CompanyProfileOtherIno> {
        const url = this.settingsService.settings.CompanyProfileOtherInfo+ 'customerId=' + customerId ;
        return this.http.get<CompanyProfileOtherIno>(url)
            .catch(
                this.handleError
            );
    }


    getCompanyCustomerLocationInfo(customerId: number): Observable<CustomerLocationInfo[]> {
        const url = this.settingsService.settings.customerPreferredLocationendpoint + 'customerId=' + customerId + '&isPostajob=false' ;
        return this.http.get<CustomerLocationInfo[]>(url)
            .catch(
                this.handleError
            );
    }

    DeleteLocation(LocationId:number,customerId: number) {
        const url = this.settingsService.settings.DeleteCustomerLocation+ 'preferredLocationId=' + LocationId + '&customerId=' + customerId;
        return this.http.delete<string[]>(url)
          .catch(
            this.handleError
          );
      }

    getCompanyCustomerLocationList(customerId: number): Observable<CustomerLocationInfo[]> {
        const url = this.settingsService.settings.customerPreferredLocationendList + 'customerId=' + customerId;
        return this.http.get<CustomerLocationInfo[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyBenfits(customerId: number): Observable<GetCompanyBenefit[]> {
        const url = this.settingsService.settings.GetCompanyBenfits + 'customerId=' + customerId + '&companyBenefitId=0';
        return this.http.get<GetCompanyBenefit[]>(url)
            .catch(
                this.handleError
            );
    }


    getCompanySpecialities(customerId: number): Observable<CompanySpecialities[]> {
        const url = this.settingsService.settings.CompanySpecialities + 'customerId=' + customerId + '&companySpecialityId=0';
        return this.http.get<CompanySpecialities[]>(url)
            .catch(
                this.handleError
            );
    }

    GetCompanyTechnologies(customerId: number): Observable<GetCompanyTechnology[]> {
        const url = this.settingsService.settings.CompanyTechnologies + 'customerId=' + customerId + '&companyTechnologyId=0';
        return this.http.get<GetCompanyTechnology[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyAboutInfo(customerId: number): Observable<GetAboutCompany[]> {
        const url = this.settingsService.settings.GetAboutCompany + 'customerId=' + customerId;
        return this.http.get<GetAboutCompany[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyWhitePapers(customerId: number): Observable<GetCompanyWhitePaper[]> {
        const url = this.settingsService.settings.CompanyWhitePapers + 'customerId=' + customerId + '&companyWhitePaperId=0';
        return this.http.get<GetCompanyWhitePaper[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyNewsInfo(customerId: number): Observable<GetCompanyNewsInfo[]> {
        const url = this.settingsService.settings.CompanyNewsPapers + 'customerId=' + customerId + '&companyNewsInfoId=0';
        return this.http.get<GetCompanyNewsInfo[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyAchivements(customerId: number): Observable<GetCompanyAchievement[]> {
        const url = this.settingsService.settings.ComapnyAchivements + 'customerId=' + customerId + '&companyAchievementId=0';
        return this.http.get<GetCompanyAchievement[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyCultures(customerId: number): Observable<GetCompanyCulture[]> {
        const url = this.settingsService.settings.CompanyCultures + 'customerId=' + customerId + '&companyCultureId=0';
        return this.http.get<GetCompanyCulture[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyCertifications(customerId: number): Observable<GetCompanyCertification[]> {
        const url = this.settingsService.settings.CompanyCertifications + 'customerId=' + customerId + '&companyCertificationId=0';
        return this.http.get<GetCompanyCertification[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyPartnerShips(customerId: number): Observable<GetCompanyPartner[]> {
        const url = this.settingsService.settings.CompanyPartnerships + 'customerId=' + customerId + '&companyPartnerId=0';
        return this.http.get<GetCompanyPartner[]>(url)
            .catch(
                this.handleError
            );
    }

    getCompanyLogo(customerId: number): Observable<GetCompanyLogo> {
        const url = this.settingsService.settings.GetCompanyLogo + 'customerId=' + customerId;
        return this.http.get<GetCompanyLogo>(url)
            .catch(
                this.handleError
            );
    }
}
