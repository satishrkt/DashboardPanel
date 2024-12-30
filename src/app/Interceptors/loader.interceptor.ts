import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { UserServicesService } from '../Services/user-services.service';

export const loaderInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) : Observable<HttpEvent<any>> => {

  const userService = inject(UserServicesService);
  userService.showSpinner();
  return next(req).pipe(
    catchError(error => {
      console.log('Http Error : ', error);
      return throwError(error);
    }),
    finalize(() => userService.hideSpinner())
  );
};
