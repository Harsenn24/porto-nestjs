import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TreatmentDocument } from './model/treatment.schema';
import { I_CreateTreatment } from './interface/create';
import { ObjectId } from 'bson';

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
}
