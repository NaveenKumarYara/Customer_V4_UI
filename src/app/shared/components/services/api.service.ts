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