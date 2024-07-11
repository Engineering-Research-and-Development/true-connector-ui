import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ContractOffer,
  OfferedResource,
  Representation,
} from '../../models/selfDescriptionModel';
import { SelfDescription } from './../../models/selfDescriptionModel';

@Injectable({
  providedIn: 'root',
})
export class SelfDescriptionService {
  private apiUrl = environment.SELF_DESCRIPTION_URL;
  private SelfDescriptionApi = environment.SELF_DESCRIPTION_API;
  private ContractOfferAPI = environment.CONTRACT_OFFER_API;
  private OfferedResourceAPI = environment.OFFERED_RESOURCE_API;
  private RepresentationAPI = environment.REPRESENTATION_API;

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {}

  /**
   * Fetches the self-description data from the API.
   * @returns An observable of the self-description data.
   */
  getSelfDescriptionData(): Observable<SelfDescription> {
    return this.http.get<SelfDescription>(
      this.apiUrl + this.SelfDescriptionApi
    );
  }

  /**
   * Fetches the unchecked self-description data from the API.
   * @returns An observable of the self-description data.
   */
  getSelfDescriptionRawData(): Observable<SelfDescription> {
    return this.http.get<SelfDescription>(
      this.apiUrl + this.SelfDescriptionApi
    );
  }

  /**
   * Fetches a contract offer by its ID.
   * @param contractOfferId The ID of the contract offer.
   * @returns An observable of the contract offer.
   */
  getContractOfferById(contractOfferId: string): Observable<ContractOffer> {
    this.headers.set('contractOffer', contractOfferId);

    return this.http.get<ContractOffer>(this.apiUrl + this.ContractOfferAPI, {
      headers: this.headers,
    });
  }

  /**
   * Adds a new contract offer to the specified offered resource.
   * @param contractOffer The contract offer to add.
   * @param offeredResourceId The ID of the offered resource.
   * @returns An observable of the added contract offer.
   */
  addContractOffer(
    contractOffer: ContractOffer,
    offeredResourceId: string
  ): Observable<ContractOffer> {
    this.headers.set('resource', offeredResourceId);
    this.headers.set('Content-Type', 'application/json');

    return this.http.post<ContractOffer>(
      this.apiUrl + this.ContractOfferAPI,
      contractOffer,
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Updates an existing contract offer for the specified offered resource.
   * @param contractOffer The contract offer to update.
   * @param offeredResourceId The ID of the offered resource.
   * @returns An observable of the updated contract offer.
   */
  updateContractOffer(
    contractOffer: ContractOffer,
    offeredResourceId: string
  ): Observable<ContractOffer> {
    this.headers.set('resource', offeredResourceId);
    this.headers.set('Content-Type', 'application/json');

    return this.http.put<ContractOffer>(
      this.apiUrl + this.ContractOfferAPI,
      contractOffer
    );
  }

  /**
   * Deletes a contract offer by its ID.
   * @param contractOfferId The ID of the contract offer.
   * @returns An observable of the deleted contract offer.
   */
  deleteContractOffer(contractOfferId: string): Observable<ContractOffer> {
    this.headers.set('contractOffer', contractOfferId);

    return this.http.delete<ContractOffer>(
      this.apiUrl + this.ContractOfferAPI,
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Fetches an offered resource by its ID.
   * @param offeredResourceId The ID of the offered resource.
   * @returns An observable of the offered resource.
   */
  getOfferedResourceById(
    offeredResourceId: string
  ): Observable<OfferedResource> {
    this.headers.set('resource', offeredResourceId);

    return this.http.get<OfferedResource>(this.apiUrl, {
      headers: this.headers,
    });
  }

  /**
   * Adds a new offered resource to the specified resource catalog.
   * @param offeredResource The offered resource to add.
   * @param resourceCatalogId The ID of the resource catalog.
   * @returns An observable of the added offered resource.
   */
  addOfferedResource(
    offeredResource: OfferedResource,
    resourceCatalogId: string
  ): Observable<OfferedResource> {
    this.headers.set('catalog', resourceCatalogId);
    this.headers.set('Content-Type', 'application/json');

    return this.http.post<OfferedResource>(
      this.apiUrl + this.OfferedResourceAPI,
      offeredResource,
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Updates an existing offered resource for the specified resource catalog.
   * @param offeredResource The offered resource to update.
   * @param resourceCatalogId The ID of the resource catalog.
   * @returns An observable of the updated offered resource.
   */
  updateOfferedResource(
    offeredResource: OfferedResource,
    resourceCatalogId: string
  ): Observable<OfferedResource> {
    this.headers.set('catalog', resourceCatalogId);
    this.headers.set('Content-Type', 'application/json');

    return this.http.put<OfferedResource>(
      this.apiUrl + this.OfferedResourceAPI,
      offeredResource
    );
  }

  /**
   * Deletes an offered resource by its ID.
   * @param offeredResourceId The ID of the offered resource.
   * @returns An observable of the deleted offered resource.
   */
  deleteOfferedResource(
    offeredResourceId: string
  ): Observable<OfferedResource> {
    this.headers.set('resource', offeredResourceId);

    return this.http.delete<OfferedResource>(
      this.apiUrl + this.OfferedResourceAPI,
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Fetches a representation by its ID.
   * @param representationId The ID of the representation.
   * @returns An observable of the representation.
   */
  getRepresentationById(representationId: string): Observable<Representation> {
    this.headers.set('representation', representationId);

    return this.http.get<Representation>(this.apiUrl + this.RepresentationAPI, {
      headers: this.headers,
    });
  }

  /**
   * Adds a new representation to the specified offered resource.
   * @param representation The representation to add.
   * @param offeredResourceId The ID of the offered resource.
   * @returns An observable of the added representation.
   */
  addRepresentation(
    representation: Representation,
    offeredResourceId: string
  ): Observable<Representation> {
    this.headers.set('resource', offeredResourceId);
    this.headers.set('Content-Type', 'application/json');

    return this.http.post<Representation>(
      this.apiUrl + this.RepresentationAPI,
      representation,
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Updates an existing representation for the specified offered resource.
   * @param representation The representation to update.
   * @param offeredResourceId The ID of the offered resource.
   * @returns An observable of the updated representation.
   */
  updateRepresentation(
    representation: Representation,
    offeredResourceId: string
  ): Observable<Representation> {
    this.headers.set('resource', offeredResourceId);
    this.headers.set('Content-Type', 'application/json');

    return this.http.put<Representation>(
      this.apiUrl + this.RepresentationAPI,
      representation,
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Deletes a representation by its ID.
   * @param representationId The ID of the representation.
   * @returns An observable of the deleted representation.
   */
  deleteRepresentation(representationId: string): Observable<Representation> {
    this.headers.set('representation', representationId);

    return this.http.delete<Representation>(
      this.apiUrl + this.RepresentationAPI,
      {
        headers: this.headers,
      }
    );
  }
}
