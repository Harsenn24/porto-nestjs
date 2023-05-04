import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DoctorDocument } from './model/doctor.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { I_CreateDoctor } from './interface/create';
import { ObjectId } from 'bson';
import { readDoctorSuccess } from './model/read/gkl.output';
import { search_something } from 'src/helper/search';
import { readDoctorDetailSuccess } from './model/detail/gkl.output';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel('Doctor') private readonly doctorModel: Model<DoctorDocument>,
    private jwtService: JwtService,
  ) {}

  async createDoctor(input: I_CreateDoctor): Promise<boolean> {
    const result = await this.doctorModel.insertMany([input]);
    return result.length > 0 ? true : false;
  }

  async updateDoctor(
    input: I_CreateDoctor,
    id_doctor: ObjectId,
  ): Promise<boolean> {
    const result = await this.doctorModel.findByIdAndUpdate(
      { _id: id_doctor },
      [{ $set: input }],
    );

    if (!result) {
      return false;
    } else {
      return true;
    }
  }

  async deleteDoctor(doctor_id: ObjectId): Promise<boolean> {
    const result = await this.doctorModel.deleteOne({ _id: doctor_id });

    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  }

  async readDoctor(
    search_name: string,
    brand_id: ObjectId,
  ): Promise<readDoctorSuccess[]> {
    const result: readDoctorSuccess[] = await this.doctorModel.aggregate([
      {
        $match: {
          _brand: brand_id,
        },
      },
      {
        $lookup: {
          from: 'consult_cluster',
          foreignField: '_doctor',
          localField: '_id',
          as: 'consult_cluster',
          pipeline: [
            {
              $project: {
                score: '$review.score',
              },
            },
          ],
        },
      },
      {
        $addFields: {
          total_score: { $sum: '$consult_cluster.score' },
        },
      },
      {
        $sort: { total_score: -1 },
      },
      {
        $match: search_something('detail.username', search_name),
      },
      {
        $project: {
          avatar: '$detail.avatar',
          name: '$detail.username',
          speciality: {
            $reduce: {
              input: '$detail.speciality',
              initialValue: '',
              in: {
                $concat: [
                  '$$value',
                  { $cond: [{ $eq: ['$$value', ''] }, '', ', '] },
                  '$$this',
                ],
              },
            },
          },
        },
      },
    ]);

    if (result.length > 0) {
      return result;
    } else {
      throw 0;
    }
  }

  async readDoctorDetail(
    id_doctor: ObjectId,
    brand_id: ObjectId,
  ): Promise<readDoctorDetailSuccess[]> {
    const result: readDoctorDetailSuccess[] = await this.doctorModel.aggregate([
      {
        $match: {
          _brand: brand_id,
          _id: id_doctor,
        },
      },
      {
        $lookup: {
          from: 'consult_cluster',
          foreignField: '_doctor',
          localField: '_id',
          as: 'consult_cluster',
          pipeline: [
            {
              $project: {
                score: '$review.score',
                total: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          totalConsult: { $sum: '$consult_cluster.total' },
          totalReview: { $sum: '$consult_cluster.score' },
          university_name: {
            $map: {
              input: '$detail.university',
              in: '$$this.name',
            },
          },
        },
      },
      {
        $project: {
          avatar: '$detail.avatar',
          name: '$detail.username',
          speciality: {
            $reduce: {
              input: '$detail.speciality',
              initialValue: '',
              in: {
                $concat: [
                  '$$value',
                  { $cond: [{ $eq: ['$$value', ''] }, '', ', '] },
                  '$$this',
                ],
              },
            },
          },
          totalConsult: '$totalConsult',
          totalReview: '$totalReview',
          document: {
            $map: {
              input: '$legalDocument',
              in: {
                type: '$$this.type',
                image: '$$this.document',
                number: 0,
              },
            },
          },
          university: {
            $reduce: {
              input: '$university_name',
              initialValue: '',
              in: {
                $concat: [
                  '$$value',
                  { $cond: [{ $eq: ['$$value', ''] }, '', ', '] },
                  '$$this',
                ],
              },
            },
          },
          phone: 'belum ada',
          email: 'belum ada',
          joinDate: { $toDate: '$_id' },
          id: '$_id',
        },
      },
    ]);

    console.log(result);

    if (result.length > 0) {
      return result;
    } else {
      throw 0;
    }
  }
}
