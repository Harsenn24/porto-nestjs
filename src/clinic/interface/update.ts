import { ObjectId } from 'bson';

export interface I_ClinicDetailUpdate {
  name: string;
  avatar: string;
  description: string;
}

export interface I_LocationDetailUpdate {
  type: string;
  coordinates: Array<number>;
}

export interface I_ClinicAddressUpdate {
  city: string;
  area: string;
  district: string;
  province: string;
  location: I_LocationDetailUpdate;
}

export interface I_ClinicLegalDocumentUpdate {
  type: string;
  document: string;
}

export interface I_ClinicUserAccessUpdate {
  username: string;
  password: string;
  email: string;
  roleLevel: string;
}

export interface I_CreateClinicUpdate {
  _brand: ObjectId;
  detail: I_ClinicDetailUpdate;
  address: I_ClinicAddressUpdate;
  legalDocument: I_ClinicLegalDocumentUpdate[];
  userAccess: I_ClinicUserAccessUpdate[];
}
