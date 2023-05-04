import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClinicId {
  @Field()
  clinic_id: string;
}
