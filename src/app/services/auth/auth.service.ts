import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SelfDescription } from '../../models/selfDescriptionModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private contractNegotiationApi = environment.PROXY_ENDPOINT_URL;
  private rootApi = environment.SELF_DESCRIPTION_URL;
  private SelfDescriptionApi = environment.SELF_DESCRIPTION_API;

  private authStatus = new BehaviorSubject<{
    provider: boolean;
    consumer: boolean;
  }>({ provider: false, consumer: false });
  private currentProfileType = new BehaviorSubject<{
    profileType: 'provider' | 'consumer' | '';
  }>({ profileType: '' });

  authStatus$ = this.authStatus.asObservable();
  currentProfileType$ = this.currentProfileType.asObservable();

  constructor(private http: HttpClient) {
    this.checkInitialAuthState();
  }

  /**
   * Checks the initial authentication state by retrieving tokens and profile type from local storage.
   */
  private checkInitialAuthState() {
    const providerToken = localStorage.getItem('provider_auth_token');
    const consumerToken = localStorage.getItem('consumer_auth_token');
    const profileType = localStorage.getItem('currentProfileType');

    if (providerToken) {
      this.authStatus.next({ ...this.authStatus.value, provider: true });
      this.currentProfileType.next({ profileType: 'provider' });
    }
    if (consumerToken) {
      this.authStatus.next({ ...this.authStatus.value, consumer: true });
      this.currentProfileType.next({ profileType: 'consumer' });
    }
    if (profileType) {
      this.currentProfileType.next({
        profileType: profileType as 'provider' | 'consumer',
      });
    }
  }

  /**
   * Logs in the user by validating credentials and storing the token.
   * @param username The username of the user.
   * @param password The password of the user.
   * @param type The profile type ('provider' or 'consumer').
   * @returns An observable that emits a boolean indicating the success of the login operation.
   */
  login(
    username: string,
    password: string,
    type: 'provider' | 'consumer'
  ): Observable<boolean> {
    const token = btoa(`${username}:${password}`);
    if (type === 'provider') {
      return this.validateProviderCredentials(token).pipe(
        map((isValid) => {
          if (isValid) {
            localStorage.setItem('provider_auth_token', token);
            this.authStatus.next({ ...this.authStatus.value, provider: true });
            this.currentProfileType.next({ profileType: 'provider' });
            localStorage.setItem('currentProfileType', 'provider');
            return true;
          } else {
            return false;
          }
        })
      );
    } else if (type === 'consumer') {
      return this.validateConsumerCredentials(token).pipe(
        map((isValid) => {
          if (isValid) {
            localStorage.setItem('consumer_auth_token', token);
            this.authStatus.next({ ...this.authStatus.value, consumer: true });
            this.currentProfileType.next({ profileType: 'consumer' });
            localStorage.setItem('currentProfileType', 'consumer');
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      return of(false);
    }
  }

  /**
   * Retrieves the token for the specified profile type from local storage.
   * @param type The profile type ('provider' or 'consumer').
   * @returns The token as a string or null if not found.
   */
  getToken(type: 'provider' | 'consumer'): string | null {
    if (type === 'provider') {
      return localStorage.getItem('provider_auth_token');
    } else if (type === 'consumer') {
      return localStorage.getItem('consumer_auth_token');
    }
    return null;
  }

  /**
   * Checks if the user is authenticated for the specified profile type.
   * @param type The profile type ('provider' or 'consumer').
   * @returns A boolean indicating if the user is authenticated.
   */
  isAuthenticated(type: 'provider' | 'consumer'): boolean {
    return this.getToken(type) !== null;
  }

  /**
   * Sets the current user type.
   * @param profileType The profile type ('provider' or 'consumer').
   */
  setCurrentUserType(profileType: 'provider' | 'consumer'): void {
    this.currentProfileType.next({ profileType });
  }

  /**
   * Retrieves the current user type.
   * @returns The current profile type as 'provider', 'consumer', or ''.
   */
  getCurrentUserType(): 'provider' | 'consumer' | '' {
    return this.currentProfileType.value.profileType;
  }

  /**
   * Logs out the user for the specified profile type by removing the token and updating the authentication status.
   * @param type The profile type ('provider' or 'consumer').
   */
  logout(type: 'provider' | 'consumer'): void {
    if (type === 'provider') {
      localStorage.removeItem('provider_auth_token');
      this.authStatus.next({ ...this.authStatus.value, provider: false });
    } else if (type === 'consumer') {
      localStorage.removeItem('consumer_auth_token');
      this.authStatus.next({ ...this.authStatus.value, consumer: false });
    }
    localStorage.removeItem('currentProfileType');
  }

  /**
   * Retrieves the username for the specified profile type from the token.
   * @param profileType The profile type ('provider' or 'consumer').
   * @returns The username as a string.
   */
  getUserName(profileType: 'provider' | 'consumer'): string {
    const token = this.getToken(profileType);
    if (token) {
      const decodedToken = atob(token);
      const [username] = decodedToken.split(':');
      return username;
    }
    return '';
  }

  /**
   * Validates the consumer credentials by sending a request to the contract negotiation API.
   * @param token The authentication token.
   * @returns An observable that emits a boolean indicating the validity of the credentials.
   */
  private validateConsumerCredentials(token: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + token,
      login: 'true',
    });

    const options = { headers };

    const body = {
      multipart: environment.MULTIPART_TYPE,
      'Forward-To': environment.FORWARD_TO,
      messageType: 'DescriptionRequestMessage',
    };

    return this.http.post<any>(this.contractNegotiationApi, body, options).pipe(
      map((response) => {
        return true;
      }),
      catchError((error) => {
        console.error('Request failed with status', error.status);
        return of(false);
      })
    );
  }

  /**
   * Validates the provider credentials by sending a request to the self-description API.
   * @param token The authentication token.
   * @returns An observable that emits a boolean indicating the validity of the credentials.
   */
  private validateProviderCredentials(token: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + token,
      login: 'true',
    });

    const options = { headers };

    return this.http
      .get<SelfDescription>(this.rootApi + this.SelfDescriptionApi, options)
      .pipe(
        map((response) => {
          return true;
        }),
        catchError((error) => {
          console.error('Request failed with status', error.status);
          return of(false);
        })
      );
  }
}
