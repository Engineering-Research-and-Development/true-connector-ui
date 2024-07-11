import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  OfferedResource,
  ResourceCatalog,
  SelfDescription,
} from '../../models/selfDescriptionModel';
import { SelfDescriptionService } from '../../services/self-description/self-description.service';
@Component({
  selector: 'app-self-description',
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
  templateUrl: './self-description.component.html',
  styleUrl: './self-description.component.css',
})
export class SelfDescriptionComponent {
  selfDescriptionData!: SelfDescription;
  resourceCatalog!: ResourceCatalog;
  loading: boolean = true;

  constructor(
    private selfDescriptionService: SelfDescriptionService,
    private router: Router
  ) {}

  /**
   * Fetches the self-description data and initializes the resource catalog.
   */
  ngOnInit(): void {
    this.selfDescriptionService.getSelfDescriptionData().subscribe({
      next: (data) => {
        this.selfDescriptionData = data;
        this.resourceCatalog =
          this.selfDescriptionData['ids:resourceCatalog'][0];
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
   * Navigates to the offered resource details page with the selected offered resource.
   * @param offeredResource The offered resource to navigate to.
   */
  navigateToOfferedResourceDetails(offeredResource: OfferedResource) {
    this.router.navigate(['/offered-resources/details'], {
      state: { offeredResource: offeredResource },
    });
  }
}
