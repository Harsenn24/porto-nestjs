export interface I_BrandDetail {
  name: string;
  image: string;
  description: string;
  address: string;
  phone: string;
  website: string;
}

export interface I_UserAccess {
  username: string;
  password: string;
  email: string;
  roleLevel: string;
}

export interface I_BrandLegalDocument {
  type: string;
  document: string;
}

export interface I_BrandFinances {
  loan: number;
  income: number;
  withdraw: number;
  balance: number;
}

export interface I_BrandRegister {
  detail: I_BrandDetail;
  legalDocument: I_BrandLegalDocument[];
  finances: I_BrandFinances;
  userAccess: I_UserAccess[];
}

export interface I_UserList {
  username: string;
  email: string;
  roleLevel: string;
}
