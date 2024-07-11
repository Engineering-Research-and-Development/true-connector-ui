import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OfferedResource } from '../../models/selfDescriptionModel';
import { SelfDescriptionService } from '../../services/self-description/self-description.service';

@Component({
  selector: 'app-offered-resources',
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
  templateUrl: './offered-resources.component.html',
  styleUrl: './offered-resources.component.css',
})
export class OfferedResourcesComponent implements OnInit {
  offeredResources!: OfferedResource[];
  loading: boolean = true;

  constructor(
    private selfDescriptionService: SelfDescriptionService,
    private router: Router
  ) {}

  /**
   * Fetches the offered resources data.
   */
  ngOnInit() {
    this.getOfferedResources();
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

  /**
   * Removes the 'ids:' prefix from the given key if it exists.
   * @param key The key to remove the prefix from.
   * @returns The key without the 'ids:' prefix.
   */
  removeIdsPrefix(key: string): string {
    return key.startsWith('ids:') ? key.slice(4) : key;
  }

  /**
   * Fetches the offered resources from the self-description service.
   */
  private getOfferedResources() {
    this.selfDescriptionService.getSelfDescriptionRawData().subscribe({
      next: (data) => {
        this.offeredResources =
          data['ids:resourceCatalog'][0]['ids:offeredResource'];
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
