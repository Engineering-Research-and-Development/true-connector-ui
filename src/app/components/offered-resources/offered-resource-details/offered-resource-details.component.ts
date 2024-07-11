import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import {
  OfferedResource,
  Representation,
} from '../../../models/selfDescriptionModel';
import { ContractOffer } from './../../../models/selfDescriptionModel';

@Component({
  selector: 'app-offered-resource-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatIcon,
    MatCard,
  ],
  templateUrl: './offered-resource-details.component.html',
  styleUrl: './offered-resource-details.component.css',
})
export class OfferedResourceDetailsComponent {
  offeredResource!: OfferedResource;
  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.offeredResource = navigation.extras.state['offeredResource'];
    } else {
      this.goBack();
    }
  }

  /**
   * Navigates back to the previous location.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Extracts the language code from the given URL.
   * @param url The URL to extract the language code from.
   * @returns The extracted language code.
   */
  getLanguageCode(url: string): string {
    return url.slice(-2);
  }

  /**
   * Removes the 'ids:' prefix from the given key if it exists.
   * @param key The key to remove the prefix from.
   * @returns The key without the 'ids:' prefix.
   */
  removeIdsPrefix(key: string): string {
    return key.startsWith('ids:') ? key.slice(4) : key;
  }

  /**
   * Removes the 'https://w3id.org/idsa/code/' prefix from the given key if it exists.
   * @param key The key to remove the prefix from.
   * @returns The key without the 'https://w3id.org/idsa/code/' prefix.
   */
  removeIdsaCodePrefix(key: string): string {
    const prefix = 'https://w3id.org/idsa/code/';
    if (key.startsWith(prefix)) {
      return key.substring(prefix.length);
    }
    return key;
  }

  /**
   * Navigates to the representation details page with the selected representation and offered resource ID.
   * @param representation The representation to navigate to.
   * @param offeredResourceId The ID of the offered resource.
   */
  navigateToRepresentationDetails(
    representation: Representation,
    offeredResourceId: string
  ) {
    let RepresentationDetails = {
      offeredResourceId: offeredResourceId,
      offeredResourceTitle: this.offeredResource['ids:title'][0]['@value'],
      offeredResourceDescription:
        this.offeredResource['ids:description'][0]['@value'],
      '@type': representation['@type'],
      '@id': representation['@id'],
      'ids:instance': representation['ids:instance'],
      'ids:created': representation['ids:created'],
      'ids:language': representation['ids:language'],
    };

    this.router.navigate(['/representations/details'], {
      state: {
        representation: RepresentationDetails,
      },
    });
  }

  /**
   * Navigates to the contract offer details page with the selected contract offer and offered resource ID.
   * @param contractOffer The contract offer to navigate to.
   * @param offeredResourceId The ID of the offered resource.
   */
  navigateToContractOfferDetails(
    contractOffer: ContractOffer,
    offeredResourceId: string
  ) {
    let ContractOfferDetails = {
      offeredResourceId: offeredResourceId,
      offeredResourceTitle: this.offeredResource['ids:title'][0]['@value'],
      offeredResourceDescription:
        this.offeredResource['ids:description'][0]['@value'],
      '@type': contractOffer['@type'],
      '@id': contractOffer['@id'],
      'ids:contractStart': contractOffer['ids:contractStart'],
      'ids:contractDate': contractOffer['ids:contractDate'],
      'ids:provider': contractOffer['ids:provider'],
      'ids:permission': contractOffer['ids:permission'],
    };

    this.router.navigate(['/contract-offers/details'], {
      state: {
        contractOffer: ContractOfferDetails,
      },
    });
  }
}
