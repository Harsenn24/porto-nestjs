import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BrandLoginData {
  @Field()
  token: string;

  @Field()
  success: boolean;
}
