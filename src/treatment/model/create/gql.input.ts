import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TreatmentDetail {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  description: string;
}

@InputType()
export class TreatmentPriceDiscount {
  @Field()
  hasDiscount: boolean;

  @Field()
  discountCut: number;
}

@InputType()
export class TreatmentPrice {
  @Field()
  amount: number;

  @Field(() => TreatmentPriceDiscount)
  discount: TreatmentPriceDiscount;
}

@InputType()
export class TreatmentCreate {
  @Field(() => TreatmentDetail)
  detail: TreatmentDetail;

  @Field(() => TreatmentPrice)
  price: TreatmentPrice;
}
