import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class createTreatmentSuccess {
  @Field()
  success: boolean;
}
