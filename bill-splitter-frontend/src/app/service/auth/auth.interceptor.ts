import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {StorageService} from '../storage/storage.service';
import {environment} from '../../../environments/environment';
import {flatMap} from 'rxjs/internal/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private router: Router) {
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
        flatMap((clonedRequest) => next.handle(clonedRequest).pipe(tap(() => {
          }, (err) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              this.router.navigate(['login']);
            }
            return;
          })))
      );
  }
}
