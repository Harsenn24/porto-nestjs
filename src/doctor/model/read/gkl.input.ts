import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class readDoctor {
  @Field()
  search: string;
}
