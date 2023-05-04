import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export class TreatmentDetail extends Document {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  description: string;
}

export class TreatmentPriceDiscount extends Document {
  @Prop()
  hasDiscount: boolean;

  @Prop()
  discountCut: number;
}

export class TreatmentPrice extends Document {
  @Prop()
  amount: number;

  @Prop(() => TreatmentPriceDiscount)
  discount: TreatmentPriceDiscount;
}

@Schema({ collection: 'treatment' })
export class Treatment extends Document {
  @Prop(() => [ObjectId])
  _clinics: ObjectId[];

  @Prop()
  isAccepting: boolean;

  @Prop(() => TreatmentDetail)
  detail: TreatmentDetail;

  @Prop(() => TreatmentPrice)
  price: TreatmentPrice;
}

export type TreatmentDocument = Treatment & Document;
export const TreatmentSchema = SchemaFactory.createForClass(Treatment);
