import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class readDoctorDetail {
  @Field()
  id_doctor: string;
}
