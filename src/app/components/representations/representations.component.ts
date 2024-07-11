import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  OfferedResource,
  Representation,
  RepresentationDetails,
  SelfDescription,
} from '../../models/selfDescriptionModel';
import { SelfDescriptionService } from './../../services/self-description/self-description.service';

@Component({
  selector: 'app-representations',
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
  templateUrl: './representations.component.html',
  styleUrl: './representations.component.css',
})
export class RepresentationsComponent implements OnInit {
  selfDescriptionData!: SelfDescription;
  representationsDetails: RepresentationDetails[] = [];
  loading: boolean = true;

  constructor(private selfDescriptionService: SelfDescriptionService) {}

  /**
   * Fetches the self-description data and extracts representation details.
   */
  ngOnInit(): void {
    this.selfDescriptionService.getSelfDescriptionRawData().subscribe({
      next: (data) => {
        this.selfDescriptionData = data;
        this.representationsDetails = this.extractRepresentationDetails(
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
   * Extracts representation details from the self-description data.
   * @param data The self-description data to extract from.
   * @returns An array of representation details.
   */
  private extractRepresentationDetails(
    data: SelfDescription
  ): RepresentationDetails[] {
    const representationDetailsArray: RepresentationDetails[] = [];

    data['ids:resourceCatalog'].forEach((resourceCatalog) => {
      resourceCatalog['ids:offeredResource'].forEach(
        (offeredResource: OfferedResource) => {
          offeredResource['ids:representation'].forEach(
            (representation: Representation) => {
              const representationDetails: RepresentationDetails = {
                offeredResourceId: offeredResource['@id'],
                offeredResourceTitle: offeredResource['ids:title'][0]['@value'],
                offeredResourceDescription:
                  offeredResource['ids:description'][0]['@value'],
                '@type': representation['@type'],
                '@id': representation['@id'],
                'ids:created': representation['ids:created'],
                'ids:instance': representation['ids:instance'],
                'ids:language': representation['ids:language'],
              };
              representationDetailsArray.push(representationDetails);
            }
          );
        }
      );
    });

    return representationDetailsArray;
  }
}
