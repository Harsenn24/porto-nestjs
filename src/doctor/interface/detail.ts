import { ObjectId } from 'bson';

export interface I_DoctorDetailDocument {
  type: string;
  number: number;
  image: string;
}

export interface I_DoctorDetail {
  id: ObjectId;
  avatar: string;
  name: string;
  speciality: string;
  totalConsult: number;
  totalReview: number;
  phone: string;
  email: number;
  joinDate: Date;
  document: I_DoctorDetailDocument[];
  university: string;
}
