import { ObjectId } from 'bson';

export interface I_ListClinic {
  name: string;
  avatar: string;
  desc: string;
  city: string;
  id: ObjectId;
}
