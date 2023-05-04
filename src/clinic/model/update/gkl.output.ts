import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class createClinicSuccessUpdate {
  @Field()
  success: boolean;
}
