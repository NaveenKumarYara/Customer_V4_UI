import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map, retry } from 'rxjs/operators';
import { SettingsService } from 'src/settings/settings.service';

const API_URL = '';
@Injectable({
    providedIn: 'root'
})

export class ApiService {
  appUrl: string = '';
  constructor(private http: HttpClient,private settingsService: SettingsService) { 

  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'content-type':'application/x-www-form-urlencoded'
    }),
  };



  GetEmployerService(url:string, prams : any) {
    return this.http.get( this.settingsService.settings.EmployerjobsUrl+url + prams,this.httpOptions).pipe(
      debounceTime(1000), map(res => res));
  }

  downloadFile(data:any, filename='data') {
    let csvData = this.ConvertToCSV(data, ['JobTitle','JobId', 'ClientName', 'JobStatus', 'PostedDate','Assignee','JobPriority','TotalApplicants','ShortListedCount','InterviewedCount','Hired','NumberOfVacancies','JobLocations']);
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

ConvertToCSV(objArray:any, headerList:any) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = 'S.No,';

     for (let index in headerList) {
         row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
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