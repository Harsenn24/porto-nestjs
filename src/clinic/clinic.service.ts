import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClinicDpcument } from './model/clinic.schema';
import { I_CreateClinic } from './interface/create';
import { ObjectId } from 'bson';
import { I_ListClinic } from './interface/list';
import { I_CreateClinicUpdate } from './interface/update';
import { I_ClinicLogin, I_ClinicLoginData } from './interface/login';
import * as sha256 from 'crypto-js/sha256';
import { SECRET } from 'src/global.constant';

@Injectable()
export class ClinicService {
  constructor(
    @InjectModel('Clinic') private readonly cinicModel: Model<ClinicDpcument>,
    private jwtService: JwtService,
  ) {}

  async createClinic(input: I_CreateClinic): Promise<boolean> {
    const result = await this.cinicModel.insertMany([input]);
    return result.length > 0 ? true : false;
  }

  async updateClinic(
    input: I_CreateClinicUpdate,
    id_clinic: ObjectId,
  ): Promise<boolean> {
    const result = await this.cinicModel.findByIdAndUpdate({ _id: id_clinic }, [
      { $set: input },
    ]);

    if (!result) {
      return false;
    } else {
      return true;
    }
  }

  async listClinic(brand_id: ObjectId): Promise<I_ListClinic[]> {
    const result: I_ListClinic[] = await this.cinicModel.aggregate([
      {
        $match: {
          _brand: brand_id,
        },
      },
      {
        $project: {
          name: '$detail.name',
          avatar: '$detail.avatar',
          desc: '$detail.description',
          city: '$address.city',
          id: { $toString: '$_id' },
          _id: 0,
        },
      },
    ]);
    if (result.length > 0) {
      return result;
    } else {
      throw 0;
    }
  }

  async deleteClinic(clinic_id: ObjectId): Promise<boolean> {
    const result = await this.cinicModel.deleteOne({ _id: clinic_id });

    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  }

  async login(input: I_ClinicLogin): Promise<string> {
    try {
      const password = sha256(input.password).toString();

      const [find_user]: I_ClinicLoginData[] = await this.cinicModel.aggregate([
        {
          $match: {
            $or: [
              { 'userAccess.username': input.username_email },
              { 'userAccess.email': input.username_email },
            ],
            'userAccess.password': password,
          },
        },
        {
          $unwind: {
            path: '$userAccess',
          },
        },
        {
          $match: {
            $or: [
              { 'userAccess.username': input.username_email },
              { 'userAccess.email': input.username_email },
            ],
            'userAccess.password': password,
          },
        },
        {
          $project: {
            id_clinic: { $toString: '$_id' },
            brand_id: { $toString: '$_brand' },
            username: '$userAccess.username',
            email: '$userAccess.email',
            role: '$userAccess.role',
          },
        },
      ]);

      if (!find_user) {
        throw 'password salah';
      }

      return this.jwtService.sign(find_user, { secret: SECRET });
    } catch (error) {
      throw `${error}`;
    }
  }
}
