import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map, retry } from 'rxjs/operators';
import { SettingsService } from 'src/settings/settings.service';
// import { User } from 'src/app/core/entities';
import { Router } from '@angular/router';

const API_URL = '';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  appUrl: string = '';
  constructor(private router: Router, private http: HttpClient, private settingsService: SettingsService) {
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/x-www-form-urlencoded'
    }),
  };

  validateCheckemail(email: string): Observable<any> {
    return this.http.get(this.settingsService.settings.IdentitybaseUrl + '/api/CheckEmailExist?email=' + email, this.httpOptions).pipe(
      debounceTime(1000), map(res => res));
  }

  GetJobMatching(JobId: number) {
    return this.http.get(this.settingsService.settings.IdentitybaseUrl + '/api/GetMatchingWeightage?jobId=' + JobId, this.httpOptions).pipe(
      debounceTime(1000), map(res => res));
  }

  GetProfileNotesNew(jobID:any,cid:any){
    return this.http.get(this.settingsService.settings.ProfilebaseUrl +'/api/GetProfileNotesNew?profileId=0&jobId='+jobID+'&cid='+cid)
  }

  byteStorage(body: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/form-data')
    return this.http.post(this.settingsService.settings.ProfilebaseUrl + '/api/ProfileAttachmentsNew', body, {headers});
  }

  InsertCustomerDocuments(body: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/form-data')
    return this.http.post(this.settingsService.settings.ProfilebaseUrl + '/api/InsertCustomerDocuments', body, {headers});
  }

  InsertProfileNotesNew(body: any) {
    let request = '';
    let headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=UTF-8');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', ' GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', ' Origin, Content-Type, X-Auth-Token');
    headers.set('X-Frame-Options', 'http://facebook.com/');
    headers.set('x-access-token', '');
    if (body) {
      request = JSON.stringify(body);
    }
    return this.http.post(this.settingsService.settings.ProfilebaseUrl + '/api/InsertProfileNotesNew', request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    });
  }


   // Start-- Section to call the API here related JobAPI
//---------------------------------------------------------------------

getJobApi<T>(apiUrl:string):Observable<T>{
  let url=`${this.settingsService.settings.JobbaseUrl}${apiUrl}`
  return this.http.get<T>(url);
}
//----------------------------------------------------------------
  // End -- JobAPI Realted Intigration section 


  // Start-- Section to call the API here related ProfileAPI
//---------------------------------------------------------------------

getProfileApi<T>(apiUrl:string):Observable<T>{
  let url=`${this.settingsService.settings.ProfilebaseUrl}${apiUrl}`
  return this.http.get<T>(url);
}

getNewCandidates(params:any): Observable<any> {
  const apiUrl = this.settingsService.settings.EmployerjobsUrl + '/api/GetEmployerCandiates';
  return this.http.post(apiUrl, params).pipe();
  //return this.http.get<any>(apiUrl, { params }).pipe();
}
//----------------------------------------------------------------
  // End -- ProfileAPI Realted Intigration section 


  Login(body: any) {
    return this.http
      .post(this.settingsService.settings.IdentitybaseUrl + '/api/CustomerLogin', body)
      .pipe(debounceTime(1000), map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('customer', JSON.stringify(user));
        return user;
      }));
  }





  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('customer');
    this.router.navigate(['login']);
  }



  GetEmployerService(url: string, prams: any) {
    return this.http.get(this.settingsService.settings.EmployerjobsUrl + url + prams, this.httpOptions).pipe(
      debounceTime(1000), map(res => res));
  }

  GetProfileService(url:string,params:any){
    return this.http.get(this.settingsService.settings.ProfilebaseUrl + url +params)
  }

  DeleteService(url:any, prams:any) {
    return this.http.delete(this.settingsService.settings.ProfilebaseUrl + url +prams)
  }


  downloadFile(data: any, filename = 'data') {
    let csvData = this.ConvertToCSV(data, ['JobTitle', 'JobId', 'ClientName', 'JobStatus', 'PostedDate', 'Assignee', 'JobPriority', 'TotalApplicants', 'ShortListedCount', 'InterviewedCount', 'Hired', 'NumberOfVacancies', 'JobLocations']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  downloadFindCandidatesFile(data: any, filename= 'data') {
		let csvData = this.ConvertToCSV(data, [ 'fullName', 'email', 'contactNumber','jobTitleName','company','locations']);
		console.log(csvData)
		let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
		let dwldLink = document.createElement("a");
		let url = URL.createObjectURL(blob);
		let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
		if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
		  dwldLink.setAttribute("target", "_blank");
		}
		dwldLink.setAttribute("href", url);
		dwldLink.setAttribute("download", filename + ".csv");
		dwldLink.style.visibility = "hidden";
		document.body.appendChild(dwldLink);
		dwldLink.click();
		document.body.removeChild(dwldLink);
	  }

  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }






  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


 

}