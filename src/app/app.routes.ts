import { Routes } from '@angular/router';
import { ArtifactComponent } from './components/artifact/artifact.component';
import { ConnectorDetailsComponent } from './components/connector-details/connector-details.component';
import { ContractNegotiationComponent } from './components/contract-negotiation/contract-negotiation.component';
import { ContractOfferDetailsComponent } from './components/contract-offers/contract-offer-details/contract-offer-details.component';
import { ContractOffersComponent } from './components/contract-offers/contract-offers.component';
import { LoginComponent } from './components/login/login.component';
import { OfferedResourceDetailsComponent } from './components/offered-resources/offered-resource-details/offered-resource-details.component';
import { OfferedResourcesComponent } from './components/offered-resources/offered-resources.component';
import { RepresentationDetailsComponent } from './components/representations/representation-details/representation-details.component';
import { RepresentationsComponent } from './components/representations/representations.component';
import { SelfDescriptionComponent } from './components/self-description/self-description.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { consumerAuthGuard } from './guards/consumer-auth.guard';
import { providerAuthGuard } from './guards/provider-auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'self-description',
    component: SelfDescriptionComponent,
    title: 'SelfDescription data',
    canActivate: [providerAuthGuard],
  },
  {
    path: 'offered-resources',
    component: OfferedResourcesComponent,
    title: 'Manage Offered Resources',
    canActivate: [providerAuthGuard],
  },
  {
    path: 'offered-resources/details',
    component: OfferedResourceDetailsComponent,
    title: 'Offered Resource Details',
    canActivate: [providerAuthGuard],
  },
  {
    path: 'contract-offers',
    component: ContractOffersComponent,
    title: 'Manage Contract Offers',
    canActivate: [providerAuthGuard],
  },
  {
    path: 'contract-offers/details',
    component: ContractOfferDetailsComponent,
    title: 'Contract Offer Details',
    canActivate: [providerAuthGuard],
  },
  {
    path: 'representations',
    component: RepresentationsComponent,
    title: 'Manage representations',
    canActivate: [providerAuthGuard],
  },
  {
    path: 'representations/details',
    component: RepresentationDetailsComponent,
    title: 'Representation Details',
    canActivate: [providerAuthGuard],
  },
  {
    path: 'connector-configuration-details',
    component: ConnectorDetailsComponent,
    title: 'Connector configuration details',
    canActivate: [providerAuthGuard],
  },
  {
    path: 'under-construction',
    component: UnderConstructionComponent,
    title: 'Under Construction',
  },
  {
    path: 'contract-negotiation',
    component: ContractNegotiationComponent,
    title: 'Contract Negotiation',
    canActivate: [consumerAuthGuard],
  },
  {
    path: 'download-artifact',
    component: ArtifactComponent,
    title: 'Download Artifact',
    canActivate: [consumerAuthGuard],
  },
];
