import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class createClinicSuccess {
  @Field()
  success: boolean;
}
