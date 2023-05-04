import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClinicDetailUpdate {
  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field()
  description: string;
}

@InputType()
export class locationDetailUpdate {
  @Field(() => [Number])
  coordinates: number[];
}

@InputType()
export class ClinicAddressUpdate {
  @Field()
  city: string;

  @Field()
  area: string;

  @Field()
  district: string;

  @Field()
  province: string;

  @Field(() => locationDetailUpdate)
  location: locationDetailUpdate;
}

@InputType()
export class ClinicLegalDocumentUpdate {
  @Field()
  type: string;

  @Field()
  document: string;
}

@InputType()
export class ClinicUserAccessUpdate {
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
export class ClinicRegisterUpdate {
  @Field(() => [ClinicUserAccessUpdate])
  userAccess: ClinicUserAccessUpdate[];

  @Field(() => [ClinicLegalDocumentUpdate])
  legalDocument: ClinicLegalDocumentUpdate[];

  @Field(() => ClinicDetailUpdate)
  detail: ClinicDetailUpdate;

  @Field(() => ClinicAddressUpdate)
  clinicAddress: ClinicAddressUpdate;
}
