import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DoctorId {
  @Field()
  doctor_id: string;
}
