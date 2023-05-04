import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClinicLogin {
  @Field()
  username_email: string;

  @Field()
  password: string;
}
