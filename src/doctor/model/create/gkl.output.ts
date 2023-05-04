import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class createDoctorSuccess {
  @Field()
  success: boolean;
}
