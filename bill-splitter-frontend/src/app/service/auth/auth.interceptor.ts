import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, mergeMap, Observable, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from '../storage/storage.service';
import {environment} from '../../../environments/environment';
import {NavigationHandler} from '../navigation/navigation.handler';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService,
              private navHandler: NavigationHandler) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.storageService.get(environment.bearerToken))
      .pipe(
        map((bearerToken: string) => {
          if (bearerToken) {
            return request.clone({
              headers: request.headers.set('Authorization', 'Bearer ' + bearerToken)
            });
          }
          return request;
        }),
        mergeMap((clonedRequest) => next.handle(clonedRequest).pipe(tap({
          error: (err) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              this.navHandler.navigate('login');
            }
          }
        })))
      );
  }
}
