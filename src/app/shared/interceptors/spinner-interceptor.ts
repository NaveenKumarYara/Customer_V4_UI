import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    //private spinner: NgxSpinnerService
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //this.spinner.show();
        return next.handle(req).pipe(
            finalize(
                () => {
                    //debugger;
                    //this.spinner.hide()
                })
        );
    }
}