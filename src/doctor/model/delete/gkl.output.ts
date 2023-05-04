import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class deleteDoctor {
  @Field()
  success: boolean;
}
