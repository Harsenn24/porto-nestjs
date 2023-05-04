import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BrandLogin {
  @Field()
  username_email: string;

  @Field()
  password: string;
}
