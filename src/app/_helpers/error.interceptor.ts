import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Set Bearer token, It will auto append Bearer token with every request
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + currentUser.token
                }
            });
        }

        return next.handle(request).pipe(catchError(err => {
            // auto logout if 401 response returned from api
            if (err.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
            }
            return throwError(err);
        }));
    }
}