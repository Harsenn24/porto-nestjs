import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClinicDetail {
  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field()
  description: string;
}

@InputType()
export class locationDetail {
  @Field(() => [Number])
  coordinates: number[];
}

@InputType()
export class ClinicAddress {
  @Field()
  city: string;

  @Field()
  area: string;

  @Field()
  district: string;

  @Field()
  province: string;

  @Field(() => locationDetail)
  location: locationDetail;
}

@InputType()
export class ClinicLegalDocument {
  @Field()
  type: string;

  @Field()
  document: string;
}

@InputType()
export class ClinicUserAccess {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  roleLevel: string;
}

@InputType()
export class ClinicRegister {
  @Field(() => [ClinicUserAccess])
  userAccess: ClinicUserAccess[];

  @Field(() => [ClinicLegalDocument])
  legalDocument: ClinicLegalDocument[];

  @Field(() => ClinicDetail)
  detail: ClinicDetail;

  @Field(() => ClinicAddress)
  clinicAddress: ClinicAddress;
}
