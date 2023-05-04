import { ObjectId } from 'bson';

export interface I_TreatmentDetail {
  id: ObjectId;
  name: string;
  price: number;
  description: string
}
