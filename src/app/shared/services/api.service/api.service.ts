import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

import { SettingsService } from '../../../../settings/settings.service';

@Injectable()
export class ApiService {
  // baseUrll = 'http://api.tenendus.com:1090/';
  // baseUrll = 'http://localhost:61297/';
  baseUrll2 = 'http://localhost:12167/';
  isDebug = true;
  constructor(private _http: Http, private http: HttpClient, private settingsService: SettingsService) { }

  PostService(body, Url) {
    let request = '';
    if (body !== '') {
      request = JSON.stringify(body);
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', ' GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // headers.append('Access-Control-Allow-Headers', ' Origin, Content-Type, X-Auth-Token');
    headers.append('X-Frame-Options', 'http://facebook.com/');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    return this._http.post(this.getUrl(Url), request, { headers: headers })
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }
  PostService1(body, Url) {
    let request = '';
    if (body !== '') {
      request = JSON.stringify(body);
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', ' GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // headers.append('Access-Control-Allow-Headers', ' Origin, Content-Type, X-Auth-Token');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    return this._http.post('http://localhost:61297/' + Url, request, { headers: headers })
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  UploadSovrenJob(body) {
    const url = 'https://rest.resumeparsing.com/v10/parser/joborder';
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Sovren-AccountId', '25863506');
    headers.append('Sovren-ServiceKey','WmukTR4CElDGRQQa717FE3Lc1crg9Xxrc2YjifGT');
    return this._http.post(url, body, { headers: headers} )
    .map((res: Response) => res.json())
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
  }


  pushFileToStorage(file: File, body, url: string): Observable<HttpEvent<{}>> {
    let request = '';
    if (body !== '') {
      request = JSON.stringify(body);
    }
    const _formData: FormData = new FormData();
    if (body !== '') {
      request = JSON.stringify(body);
    }
    _formData.append('ResumeFile', file);
    _formData.append('Model', request);
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    return this._http.post(this.getUrl(url), _formData, { headers: headers })
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }
  pushFileToStorage1(file: File, body, url: string): Observable<HttpEvent<{}>> {
    let request = '';

    const _formData: FormData = new FormData();
    if (body !== '') {
      request = JSON.stringify(body);
    }
    _formData.append('ResumeFile', file);
    _formData.append('Model', request);
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    return this._http.post('http://localhost:61297/' + url, _formData, { headers: headers })
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  byteStorage(body, url: string): Observable<HttpEvent<{}>> {
    // let request = '';

    // let _formData: FormData = new FormData();
    // if (body !== '') {
    //   request = JSON.stringify(body);
    // }
    // _formData.append('ProfileImage', file);
    // _formData.append('Model', request);

    const headers = new Headers();

    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('x-access-token', sessionStorage.getItem('token'));

    return this._http.post(this.getUrl(url), body, { headers: headers })
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  PutService(body, Url, paramsObj?) {
    let request = '';
    if (body !== '') {
      request = JSON.stringify(body);
    }
    const params: URLSearchParams = new URLSearchParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        const element = paramsObj[key];

        params.set(key, element);
      }
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    return this._http.put(this.getUrl(Url) + params, request, { headers: headers })
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  
  GetServiceCall(url) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-access-token", sessionStorage.getItem('token'));
    // headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .get(this.getUrl(url), {
        headers: headers
      })
      .map((response: Response) => response.json())
      .retry(2)
      .catch(error => {
        return "seomething gone wrong";
      });
  }

  GetService(url, prams) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    // headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.getUrl(url) + prams, { headers: headers })
      .map((response: Response) => response.json())
      .retry(2)
      .catch((error) => {
        return 'seomething gone wrong';
      });
  }
  GetService1(url, prams) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    // headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get('http://localhost:61297/' + url + prams, { headers: headers })
      .map((response: Response) => response.json())
      .retry(2)
      .catch((error) => {
        return 'seomething gone wrong';
      });
  }
  DeleteService(url, prams) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    // headers.append('Access-Control-Allow-Origin', '*');
    return this._http.delete(this.getUrl(url) + prams, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error) => {
        return 'seomething gone wrong';
      });
  }
  // DeleteService1(url, prams) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('x-access-token', sessionStorage.getItem('token'));
  //   // headers.append('Access-Control-Allow-Origin', '*');
  //   return this._http.delete(url + prams, { headers: headers })
  //     .map((response: Response) => response.json())
  //     .catch((error) => {
  //       return 'seomething gone wrong';
  //     });
  // }
  DebugMode(str) {
    if (this.isDebug) {
      console.log(str);
      return;
    }
    return;
  }
  // postAndGetResponse(myParams) {
  //   return this._http.post(this.baseUrll + url, { myParams }, { responseType: ResponseContentType.Blob })
  //     .map(response => (<Response>response).blob())
  //     .catch(this.handleError);
  // }
  // GetService12(url) {
  //   return this.http
  //     .get(url, {
  //       responseType: ResponseContentType.Blob
  //     })
  //     .map(res => {
  //       return {
  //         filename: 'filename.pdf',
  //         data: res.blob()
  //       };
  //     })
  // }
  // downloadFile(url): Observable<Blob> {
  //   let options = new RequestOptions({ responseType: ResponseContentType.Blob });
  //   return this.http.get(this.baseUrll + '/' + url, options)
  //     .map(res => res.blob())
  //     .catch((error) => {
  //       return 'seomething gone wrong';
  //     });
  // }
  // getFile(path: string): Observable<any> {
  //   // const headers = new Headers();
  //   // headers.append('Content-Type', ResponseContentType.Blob);
  //   // headers.append('Access-Control-Allow-Origin', '*');
  //   // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  //   // headers.append('x-access-token', sessionStorage.getItem('token'));
  //   // const options = new RequestOptions({ responseType: ResponseContentType.Blob });

  //   // return this.http
  //   //   .get(path, {
  //   //     headers: new HttpHeaders().append('Content-Type', 'application/octet-stream'),
  //   //     responseType: 'blob', observe: 'body'
  //   //   });

  //   // return this._http.get(path, { headers: headers })
  //   //   .map((response: Response) => <Blob>response.blob());


  //   // this.http.get(path, { responseType: ResponseContentType.Blob })
  //   //   .subscribe((res: Response) => {
  //   //     let a = document.createElement('a');
  //   //     a.href = URL.createObjectURL(res.blob());
  //   //     a.download = 'fileName.doc';
  //   //     // start download
  //   //     a.click();
  //   //   });
  // }

  // getFile1(path: string, params): Observable<any> {
  //   let options = new RequestOptions({ responseType: ResponseContentType.Blob });
  //   return this._http.get(this.baseUrll + path + params, options)
  //     .map((response: Response) => <Blob>response.blob());
  // }
  downloadPDF(path: string, params): any {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', sessionStorage.getItem('token'));
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.getUrl(path) + params, { headers: headers }).map(
      (res: any) => {
        // return new Blob([res.blob()], { type: 'application/pdf' });
        return res;
      });
  }
  public getFile(path: string): Observable<Blob> {
    const options = new RequestOptions({ responseType: ResponseContentType.Blob });

    return this._http.get(path, options)
      .map((response: Response) => <Blob>response.blob());
    // .catch(this.handleError);
  }

  getUrl(url: string) {
    return url
      .replace(
        new RegExp("ProfileAPI", "gi"),
        this.settingsService.settings.ProfilebaseUrl
      )
      .replace(
        new RegExp("IdentityAPI", "gi"),
        this.settingsService.settings.IdentitybaseUrl
      )
      .replace(
        new RegExp("ReferralAPI", "gi"),
        this.settingsService.settings.RefralbaseUrl
      )
      .replace(
        new RegExp("JobsAPI", "gi"),
        this.settingsService.settings.JobbaseUrl
      )
      .replace(
        new RegExp("SocialSharingAPI", "gi"),
        this.settingsService.settings.SharingbaseUrl
      )
      .replace(
        new RegExp("EmailAPI", "gi"),
        this.settingsService.settings.EmailbaseUrl
      )
      .replace(
        new RegExp("QuestionAPI", "gi"),
        this.settingsService.settings.QuestionbaseUrl
      )
      .replace(
        new RegExp("EmployerAPI", "gi"),
        this.settingsService.settings.EmployerbaseUrl
      );
  }

}



