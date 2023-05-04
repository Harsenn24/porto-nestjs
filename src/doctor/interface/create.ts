import { ObjectId } from 'bson';

export interface I_DoctorDetailUniversity {
  name: string;
  graduate: Date;
}

export interface I_DoctorDetail {
  username: string;
  password: string;
  avatar: string;
  speciality: string[];
  university: I_DoctorDetailUniversity[];
}

export interface I_DoctorLegalDocument {
  type: string;
  document: string;
}

export interface I_DoctorOnline {
  isAccepting: boolean;
  lastOnline: number;
}

export interface I_DoctorPracticTime {
  start: Date;
  end: Date;
}

export interface I_DoctorPractic {
  day: string;
  isPractic: boolean;
  time: I_DoctorPracticTime[];
}

export interface I_CreateDoctor {
  _brand: ObjectId;
  _clinic: string;
  detail: I_DoctorDetail;
  legalDocument: I_DoctorLegalDocument[];
  online: I_DoctorOnline;
  practic: I_DoctorPractic[];
}
