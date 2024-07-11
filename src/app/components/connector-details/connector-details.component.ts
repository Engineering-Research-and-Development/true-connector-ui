import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { environment } from '../../../environments/environment';
import { environmentKeyDictionary } from '../../models/environment-key-dictionary';

@Component({
  selector: 'app-connector-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIcon, NgxSkeletonLoaderModule],
  templateUrl: './connector-details.component.html',
  styleUrl: './connector-details.component.css',
})
export class ConnectorDetailsComponent implements OnInit {
  environmentDetails: { key: string; value: string; displayKey: string }[] = [];
  loading: boolean = false;

  /**
   * Initializes the environment details.
   */
  ngOnInit(): void {
    this.environmentDetails = this.getEnvironmentDetails();
  }

  /**
   * Retrieves and filters the environment details, removing placeholders and mapping keys
   * to more human-readable values using the environment key dictionary.
   * @returns An array of objects containing the key, value, and displayKey for each environment variable.
   */
  private getEnvironmentDetails(): {
    key: string;
    value: string;
    displayKey: string;
  }[] {
    return Object.entries(environment)
      .filter(([key, value]) => !value.endsWith('_PLACEHOLDER'))
      .map(([key, value]) => ({
        key,
        value,
        displayKey: environmentKeyDictionary[key] || key,
      }));
  }
}
