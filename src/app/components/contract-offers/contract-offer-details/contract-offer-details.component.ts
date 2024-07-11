import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ContractOfferDetails } from '../../../models/selfDescriptionModel';

@Component({
  selector: 'app-contract-offer-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatIcon,
  ],
  templateUrl: './contract-offer-details.component.html',
  styleUrl: './contract-offer-details.component.css',
})
export class ContractOfferDetailsComponent {
  contractOffer!: ContractOfferDetails;
  offeredResourceId!: string;
  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.contractOffer = navigation.extras.state['contractOffer'];
      this.offeredResourceId = this.contractOffer.offeredResourceId;
    } else {
      this.goBack();
    }
  }
  getLanguageCode(url: string): string {
    return url.slice(-2);
  }

  removeIdsPrefix(key: string): string {
    return key.startsWith('ids:') ? key.slice(4) : key;
  }

  removeIdsaCodePrefix(key: string): string {
    const prefix = 'https://w3id.org/idsa/code/';
    if (key.startsWith(prefix)) {
      return key.substring(prefix.length);
    }
    return key;
  }

  goBack(): void {
    this.location.back();
  }
}
