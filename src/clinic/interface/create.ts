import { ObjectId } from 'bson';

export interface I_ClinicDetail {
  name: string;
  avatar: string;
  description: string;
}

export interface I_LocationDetail {
  type: string;
  coordinates: Array<number>;
}

export interface I_ClinicAddress {
  city: string;
  area: string;
  district: string;
  province: string;
  location: I_LocationDetail;
}

export interface I_ClinicLegalDocument {
  type: string;
  document: string;
}

export interface I_ClinicUserAccess {
  username: string;
  password: string;
  email: string;
  roleLevel: string;
}

export interface I_CreateClinic {
  _brand: ObjectId;
  detail: I_ClinicDetail;
  address: I_ClinicAddress;
  legalDocument: I_ClinicLegalDocument[];
  userAccess: I_ClinicUserAccess[];
}
