import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RepresentationDetails } from '../../../models/selfDescriptionModel';

@Component({
  selector: 'app-representation-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, MatIcon],
  templateUrl: './representation-details.component.html',
  styleUrl: './representation-details.component.css',
})
export class RepresentationDetailsComponent {
  representation!: RepresentationDetails;
  offeredResourceId!: string;

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.representation = navigation.extras.state['representation'];
      this.offeredResourceId = this.representation.offeredResourceId;
    } else {
      this.goBack();
    }
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
   * Navigates back to the previous location.
   */
  goBack(): void {
    this.location.back();
  }
}
