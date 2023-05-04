import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class detailTreatment {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  description: string;
}
