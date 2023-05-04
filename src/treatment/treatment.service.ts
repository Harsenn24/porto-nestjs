import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TreatmentDocument } from './model/treatment.schema';
import { I_CreateTreatment } from './interface/create';
import { ObjectId } from 'bson';
import { I_SearchClinic } from './interface/search';
import { search_something } from 'src/helper/search';
import { I_TreatmentDetail } from './interface/detail';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectModel('Treatment')
    private readonly treatmentModel: Model<TreatmentDocument>,
    private jwtService: JwtService,
  ) {}

  async createTreatment(input: I_CreateTreatment): Promise<boolean> {
    const result = await this.treatmentModel.insertMany([input]);
    return result.length > 0 ? true : false;
  }

  async updateTreatment(
    input: I_CreateTreatment,
    id_treatment: ObjectId,
  ): Promise<boolean> {
    const result = await this.treatmentModel.findByIdAndUpdate(
      { _id: id_treatment },
      [{ $set: input }],
    );

    if (!result) {
      return false;
    } else {
      return true;
    }
  }

  async deleteTreatment(treatment_id: ObjectId): Promise<boolean> {
    const result = await this.treatmentModel.deleteOne({ _id: treatment_id });

    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  }

  async addClinic(
    clinic_id: ObjectId,
    treatment_id: ObjectId,
  ): Promise<boolean> {
    const result = await this.treatmentModel.findOneAndUpdate(
      { _id: treatment_id },
      {
        $push: {
          _clinics: clinic_id,
        },
      },
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async searchTreatment(
    brand_id: ObjectId,
    search_name: string
  ): Promise<I_SearchClinic[] | string> {
    const result: I_SearchClinic[] = await this.treatmentModel.aggregate([
      {
        $match: {
          _brand: brand_id,
        },
      },
      {
        $match : search_something('detail.name', search_name)
      },
      {
        $project: {
          id: { $toString: '$_id' },
          name: '$detail.name',
          price: '$price.amount',
          _id: 0,
        },
      },
    ]);


    if (result.length > 0) {
      return result;
    } else {
      return 'no data';
    }
  }


  async detailTreatment(
    _id: ObjectId,
  ): Promise<I_TreatmentDetail | string> {
    const result: I_TreatmentDetail[] = await this.treatmentModel.aggregate([
      {
        $match: {
          _id
        },
      },
      
      {
        $project: {
          id: { $toString: _id },
          name: '$detail.name',
          price: '$price.amount',
          description : '$detail.description',
          _id: 0,
        },
      },
    ]);


    if (result.length > 0) {
      return result[0];
    } else {
      return 'no data';
    }
  }
}
