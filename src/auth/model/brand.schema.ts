import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class BrandDetail extends Document {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  website: string;
}

export class BrandLegalDocument extends Document {
  @Prop()
  type: string;

  @Prop()
  document: string;
}

export class BrandFinances extends Document {
  @Prop()
  loan: number;

  @Prop()
  income: number;

  @Prop()
  withdraw: number;

  @Prop()
  balance: number;
}

export class BrandUserAccess extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  roleLevel: string;
}

@Schema({ collection: 'brand' })
export class Brand extends Document {
  @Prop(() => BrandDetail)
  detail: BrandDetail;

  @Prop(() => Array<BrandLegalDocument>)
  legalDocument: BrandLegalDocument[];

  @Prop(() => Array<BrandFinances>)
  finances: BrandFinances[];

  @Prop(() => Array<BrandUserAccess>)
  userAccess: BrandUserAccess[];
}

export type BrandDocument = Brand & Document;
export const BrandSchema = SchemaFactory.createForClass(Brand);
