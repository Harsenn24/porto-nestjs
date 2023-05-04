import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export class DoctorDetailUniversity extends Document {
  @Prop()
  name: string;

  @Prop()
  graduate: Date;
}

export class DoctorDetail extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;

  @Prop(() => [String])
  speciality: string[];

  @Prop(() => [DoctorDetailUniversity])
  university: DoctorDetailUniversity[];
}

export class DoctorLegalDocument extends Document {
  @Prop()
  type: string;

  @Prop()
  document: string;
}

export class DoctorOnline extends Document {
  @Prop()
  isAccepting: boolean;

  @Prop()
  lastOnline: number;
}

export class DoctorPracticTime extends Document {
  @Prop()
  start: Date;

  @Prop()
  end: Date;
}

export class DoctorPractic extends Document {
  @Prop(() => [DoctorPracticTime])
  time: DoctorPracticTime[];
}

@Schema({ collection: 'doctor' })
export class Doctor extends Document {
  @Prop()
  _brand: ObjectId;

  @Prop()
  _clinic: ObjectId;

  @Prop(() => DoctorDetail)
  detail: DoctorDetail;

  @Prop(() => [DoctorLegalDocument])
  legalDocument: DoctorLegalDocument[];

  @Prop(() => DoctorOnline)
  online: DoctorOnline;

  @Prop(() => [DoctorPractic])
  practic: DoctorPractic[];
}

export type DoctorDocument = Doctor & Document;
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
