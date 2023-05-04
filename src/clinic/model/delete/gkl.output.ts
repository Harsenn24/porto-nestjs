import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class deleteClinic {
  @Field()
  success: boolean;
}
