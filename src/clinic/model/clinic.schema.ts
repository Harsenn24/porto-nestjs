import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export class ClinicDetail extends Document {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  description: string;
}

export class locationDetail extends Document {
  @Prop()
  coordinates: Array<number>;
}

export class ClinicAddress extends Document {
  @Prop()
  city: string;

  @Prop()
  area: string;

  @Prop()
  district: string;

  @Prop()
  province: string;

  @Prop(() => Array<locationDetail>)
  location: locationDetail[];
}

export class ClinicLegalDocument extends Document {
  @Prop()
  type: string;

  @Prop()
  document: string;
}

export class ClinicUserAccess extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  roleLevel: string;
}

@Schema({ collection: 'clinic' })
export class Clinic extends Document {
  @Prop()
  _brand: ObjectId;

  @Prop(() => ClinicDetail)
  detail: ClinicDetail;

  @Prop(() => ClinicAddress)
  address: ClinicAddress;

  @Prop(() => Array<ClinicLegalDocument>)
  legalDocument: ClinicLegalDocument[];

  @Prop(() => Array<ClinicUserAccess>)
  userAccess: ClinicUserAccess[];
}

export type ClinicDpcument = Clinic & Document;
export const ClinicSchema = SchemaFactory.createForClass(Clinic);
