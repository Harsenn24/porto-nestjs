import { ObjectId } from "bson";

export interface I_TreatmentDetail {
  name: string;
  image: string;
  description: string;
}

export interface I_TreatmentPriceDiscount {
  hasDiscount: boolean;
  discountCut: number;
}

export interface I_TreatmentPrice {
  amount: number;
  discount: I_TreatmentPriceDiscount;
}

export interface I_CreateTreatment {
  _brand: ObjectId
  detail: I_TreatmentDetail;
  price: I_TreatmentPrice;
}
