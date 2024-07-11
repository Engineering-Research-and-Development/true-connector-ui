import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  ContractOffer,
  ContractOfferDetails,
  OfferedResource,
  SelfDescription,
} from '../../models/selfDescriptionModel';
import { SelfDescriptionService } from '../../services/self-description/self-description.service';

@Component({
  selector: 'app-contract-offers',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatIcon,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './contract-offers.component.html',
  styleUrl: './contract-offers.component.css',
})
export class ContractOffersComponent implements OnInit {
  selfDescriptionData!: SelfDescription;
  contractOffers: ContractOfferDetails[] = [];
  loading: boolean = true;

  constructor(
    private selfDescriptionService: SelfDescriptionService,
    private router: Router
  ) {}

  /**
   * Fetches the self-description data and extracts contract offer details.
   */
  ngOnInit(): void {
    this.selfDescriptionService.getSelfDescriptionRawData().subscribe({
      next: (data) => {
        this.selfDescriptionData = data;
        this.contractOffers = this.extractContractOfferDetails(
          this.selfDescriptionData
        );
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
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
   * Navigates to the contract offer details page with the selected contract offer.
   * @param contractOffer The contract offer to navigate to.
   */
  navigateToContractOfferDetails(contractOffer: any) {
    this.router.navigate(['/contract-offers/details'], {
      state: {
        contractOffer: contractOffer,
        offeredResourceId: contractOffer.offeredResourceId,
      },
    });
  }

  /**
   * Extracts contract offer details from the self-description data.
   * @param data The self-description data to extract from.
   * @returns An array of contract offer details.
   */
  private extractContractOfferDetails(
    data: SelfDescription
  ): ContractOfferDetails[] {
    const contractOfferDetailsArray: ContractOfferDetails[] = [];

    data['ids:resourceCatalog'].forEach((resourceCatalog) => {
      resourceCatalog['ids:offeredResource'].forEach(
        (offeredResource: OfferedResource) => {
          offeredResource['ids:contractOffer'].forEach(
            (contractOffer: ContractOffer) => {
              const contractOfferDetails: ContractOfferDetails = {
                offeredResourceId: offeredResource['@id'],
                offeredResourceTitle: offeredResource['ids:title'][0]['@value'],
                offeredResourceDescription:
                  offeredResource['ids:description'][0]['@value'],
                '@type': contractOffer['@type'],
                '@id': contractOffer['@id'],
                'ids:contractStart': contractOffer['ids:contractStart'],
                'ids:contractDate': contractOffer['ids:contractDate'],
                'ids:provider': contractOffer['ids:provider'],
                'ids:permission': contractOffer['ids:permission'],
              };
              contractOfferDetailsArray.push(contractOfferDetails);
            }
          );
        }
      );
    });

    return contractOfferDetailsArray;
  }
}
