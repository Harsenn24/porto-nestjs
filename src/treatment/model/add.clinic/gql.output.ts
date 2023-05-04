import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class addCinicSuccess {
  @Field()
  success: boolean;
}
