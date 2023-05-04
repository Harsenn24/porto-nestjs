import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClinicLoginData {
  @Field()
  token: string;

  @Field()
  success: boolean;
}
