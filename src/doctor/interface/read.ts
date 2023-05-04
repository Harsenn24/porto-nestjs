import { ObjectId } from 'bson';

export interface I_readDoctor {
  _id: ObjectId;
  avatar: string;
  name: string;
  speciality: string;
  status: string;
}
