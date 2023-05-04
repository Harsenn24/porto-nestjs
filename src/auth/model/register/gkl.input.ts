import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BrandUserAccess {
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
export class BrandLegalDocument {
  @Field()
  type: string;

  @Field()
  document: string;
}

@InputType()
export class BrandDetail {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  description: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field()
  website: string;
}

@InputType()
export class BrandRegister {
  @Field(() => BrandDetail)
  detail: BrandDetail;

  @Field(() => [BrandLegalDocument])
  legalDocument: BrandLegalDocument[];

  @Field(() => [BrandUserAccess])
  userAccess: BrandUserAccess[];
}
