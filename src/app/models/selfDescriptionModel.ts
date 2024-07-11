export interface SelfDescription {
  '@context': Context;
  '@type': string;
  '@id': string;
  'ids:hasDefaultEndpoint': ConnectorEndpoint;
  'ids:resourceCatalog': ResourceCatalog[];
  'ids:securityProfile': SecurityProfile;
  'ids:curator': Curator;
  'ids:maintainer': Maintainer;
  'ids:outboundModelVersion': string;
  'ids:inboundModelVersion': string[];
  'ids:title': LangString[];
  'ids:description': LangString[];
}

interface Context {
  ids: string;
  idsc: string;
}

interface ConnectorEndpoint {
  '@type': string;
  '@id': string;
  'ids:accessURL': AccessURL;
}

interface AccessURL {
  '@id': string;
}

export interface ResourceCatalog {
  '@type': string;
  '@id': string;
  'ids:offeredResource': OfferedResource[];
}

export interface OfferedResource {
  '@type': string;
  '@id': string;
  'ids:created': DateValue;
  'ids:modified': DateValue;
  'ids:keyword': LangString[];
  'ids:contractOffer': ContractOffer[];
  'ids:representation': Representation[];
  'ids:title': LangString[];
  'ids:description': LangString[];
  'ids:contentType': ContentType;
  'ids:version': string;
  'ids:language': Language[];
}

interface DateValue {
  '@value': string;
  '@type': string;
}

interface LangString {
  '@value': string;
  '@type': string;
}

export interface ContractOffer {
  '@type': string;
  '@id': string;
  'ids:contractStart': DateValue;
  'ids:contractDate': DateValue;
  'ids:provider': Provider;
  'ids:permission': Permission[];
}

export interface ContractOfferDetails {
  offeredResourceId: string;
  offeredResourceTitle: string;
  offeredResourceDescription: string;
  '@type': string;
  '@id': string;
  'ids:contractStart': DateValue;
  'ids:contractDate': DateValue;
  'ids:provider': Provider;
  'ids:permission': Permission[];
}

interface Provider {
  '@id': string;
}

export interface Permission {
  '@type': string;
  '@id': string;
  'ids:action': Action[];
  'ids:title': LangString[];
  'ids:description': LangString[];
  'ids:target': Target;
}

interface Action {
  '@id': string;
}

interface Target {
  '@id': string;
}

export interface Representation {
  '@type': string;
  '@id': string;
  'ids:created': DateValue;
  'ids:instance': Instance[];
  'ids:language': Language;
}

export interface RepresentationDetails {
  offeredResourceId: string;
  offeredResourceTitle: string;
  offeredResourceDescription: string;
  '@type': string;
  '@id': string;
  'ids:created': DateValue;
  'ids:instance': Instance[];
  'ids:language': Language;
}

interface Instance {
  '@type': string;
  '@id': string;
  'ids:creationDate': DateValue;
  'ids:checkSum'?: string;
}

interface Language {
  '@id': string;
}

interface ContentType {
  '@id': string;
}

interface SecurityProfile {
  '@id': string;
}

interface Curator {
  '@id': string;
}

interface Maintainer {
  '@id': string;
}
