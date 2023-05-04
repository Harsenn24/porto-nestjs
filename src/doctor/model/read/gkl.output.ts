import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class readDoctorSuccess {
  @Field()
  _id: string;

  @Field()
  avatar: string;

  @Field()
  name: string;

  @Field()
  speciality: string;
}
