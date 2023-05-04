import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class readListClinic {
  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field()
  desc: string;

  @Field()
  id: string;
}
