import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { saveAs } from 'file-saver';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  OfferedResource,
  Representation,
  RepresentationDetails,
  SelfDescription,
} from '../../models/selfDescriptionModel';
import { ContractNegotiationService } from './../../services/contract-negotiation/contract-negotiation.service';

@Component({
  selector: 'app-artifact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.css'],
})
export class ArtifactComponent implements OnInit {
  artifactForm: FormGroup;
  artifacts: any[] = [];
  multipartTypes = [
    { display: 'Form', value: 'form' },
    { display: 'Mixed', value: 'mixed' },
    { display: 'HTTP Header', value: 'http-header' },
    { display: 'WSS', value: 'wss' },
  ];

  selfDescriptionData!: SelfDescription;
  representationsDetails: RepresentationDetails[] = [];
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private contractNegotiationService: ContractNegotiationService
  ) {
    this.artifactForm = this.fb.group({
      endpoint: ['', Validators.required],
      multipartType: ['form', Validators.required],
    });
  }
  /**
   * Fetches the self-description data and extracts representation details.
   */
  ngOnInit() {
    this.contractNegotiationService.sendDescriptionRequestMessage().subscribe({
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
   * Handles form submission. Fetches artifact data from the specified endpoint
   * if the form is valid.
   * TO BE IMPLEMENTED IN A CASE OF CALLING DIFFERENT CONNECTORS
   */
  onSubmit() {
    if (this.artifactForm.valid) {
      const endpoint = this.artifactForm.value.endpoint;
      const multipartType = this.artifactForm.value.multipartType;
      this.http.get<any[]>(endpoint).subscribe(
        (response) => {
          this.artifacts = response;
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
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
   * Downloads the specified artifact by sending an artifact request message
   * and saving the response as a text file.
   * @param artifactId The ID of the artifact to download.
   * @param resourceTitle The title of the resource to be used as the file name.
   */
  downloadArtifact(artifactId: string, resourceTitle: string) {
    this.contractNegotiationService
      .sendArtifactRequestMessage(artifactId)
      .subscribe({
        next: (response: string) => {
          const blob = new Blob([response], {
            type: 'text/plain;charset=utf-8',
          });
          saveAs(blob, resourceTitle + '.txt');
        },
        error: (error) => {
          console.error('Error fetching artifact response:', error);
        },
      });
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
