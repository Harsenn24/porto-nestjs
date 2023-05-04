import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DoctorDetailUniversity {
  @Field()
  name: string;

  @Field()
  graduate: Date;
}

@InputType()
export class DoctorDetail {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  avatar: string;

  @Field(() => [String])
  speciality: string[];

  @Field(() => [DoctorDetailUniversity])
  university: DoctorDetailUniversity[];
}

@InputType()
export class DoctorLegalDocument {
  @Field()
  type: string;

  @Field()
  document: string;
}

@InputType()
export class DoctorPracticTime {
  @Field()
  start: Date;

  @Field()
  end: Date;
}

@InputType()
export class DoctorPractic {
  @Field()
  day: string;

  @Field()
  isPractic: boolean;

  @Field(() => [DoctorPracticTime])
  time: DoctorPracticTime[];
}

@InputType()
export class DoctorRegister {
  @Field(() => DoctorDetail)
  detail: DoctorDetail;

  @Field(() => [DoctorLegalDocument])
  legalDocument: DoctorLegalDocument[];

  @Field(() => [DoctorPractic])
  practic: DoctorPractic[];
}
