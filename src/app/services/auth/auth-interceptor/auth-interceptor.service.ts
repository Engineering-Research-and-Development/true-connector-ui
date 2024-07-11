import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Intercepts HTTP requests to add authentication tokens.
   * @param req The outgoing HTTP request.
   * @param next The next interceptor in the chain.
   * @returns An observable of the HTTP event.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has('login')) {
      // Remove the custom 'login' header to avoid issues with the backend, since this is used as a flag for the login request.
      const headers = req.headers.delete('login');
      const cloned = req.clone({ headers });
      return next.handle(cloned);
    }

    const providerToken = this.authService.getToken('provider');
    const consumerToken = this.authService.getToken('consumer');

    let cloned;
    //This works only in case TC -> TC communication
    //TODO find elegant way for communication with other connectors
    if (req.url.includes('/api/')) {
      cloned = req.clone({
        headers: req.headers.set('Authorization', `Basic ${providerToken}`),
      });
    } else if (req.url.includes('/proxy')) {
      cloned = req.clone({
        headers: req.headers.set('Authorization', `Basic ${consumerToken}`),
      });
    } else {
      cloned = req;
    }

    return next.handle(cloned);
  }
}
