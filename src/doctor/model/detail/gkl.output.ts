import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class readDoctorDetailDocument {
  @Field()
  type: string;

  @Field()
  number: number;

  @Field()
  image: string;
}

@ObjectType()
export class readDoctorDetailSuccess {
  @Field()
  id: string;

  @Field()
  avatar: string;

  @Field()
  name: string;

  @Field()
  speciality: string;

  @Field()
  totalConsult: number;

  @Field()
  totalReview: number;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  joinDate: Date;

  @Field(() => [readDoctorDetailDocument])
  document: readDoctorDetailDocument[];

  @Field(() => String)
  university: string;
}
