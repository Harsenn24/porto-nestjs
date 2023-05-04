import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class registerSuccess {
  @Field()
  success: boolean;
}

@ObjectType()
export class userBrandList {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  roleLevel: string;
}
