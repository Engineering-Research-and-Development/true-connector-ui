import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SelfDescription } from '../../models/selfDescriptionModel';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

const options = { headers };

@Injectable({
  providedIn: 'root',
})
export class ContractNegotiationService {
  private apiUrl = environment.PROXY_ENDPOINT_URL;

  constructor(private http: HttpClient) {}

  /**
   * Sends a description request message to the API.
   * @returns An observable of the self-description data.
   */
  sendDescriptionRequestMessage(): Observable<SelfDescription> {
    const body = {
      multipart: environment.MULTIPART_TYPE,
      'Forward-To': environment.FORWARD_TO,
      messageType: 'DescriptionRequestMessage',
    };

    return this.http.post<any>(this.apiUrl, body, options);
  }

  /**
   * Sends an artifact request message to the API.
   * @param requestedArtifact The ID of the requested artifact.
   * @returns An observable of the artifact data as a string.
   */
  sendArtifactRequestMessage(requestedArtifact: string): Observable<string> {
    const body = {
      multipart: environment.MULTIPART_TYPE,
      'Forward-To': environment.FORWARD_TO,
      messageType: 'ArtifactRequestMessage',
      requestedArtifact: requestedArtifact,
      transferContract: '',
      payload: '',
    };

    return this.http.post(this.apiUrl, body, {
      ...options,
      responseType: 'text',
    });
  }
}
