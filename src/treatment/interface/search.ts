import { ObjectId } from 'bson';

export interface I_SearchClinic {
  id: ObjectId;
  name: string;
  price: number;
}
