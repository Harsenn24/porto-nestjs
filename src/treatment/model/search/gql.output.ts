import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class searchTreatment {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  price: number;
}
