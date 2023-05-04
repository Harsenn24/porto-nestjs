import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class deleteTreatment {
  @Field()
  success: boolean;
}
