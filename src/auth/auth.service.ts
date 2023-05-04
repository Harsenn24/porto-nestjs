import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { BrandDocument } from './model/brand.schema';
import {
  I_BrandRegister,
  I_UserAccess,
  I_UserList,
} from './interface/brand.register';
import { I_BrandLogin, I_BrandLoginData } from './interface/brand.login';
import * as sha256 from 'crypto-js/sha256';
import { SECRET } from 'src/global.constant';
import { ObjectId } from 'bson';
import { filter_map } from 'src/helper/filter.map';
import { search_something } from 'src/helper/search';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel('Brand') private readonly brandModel: Model<BrandDocument>,
    private jwtService: JwtService,
  ) {}

  async register(input: I_BrandRegister): Promise<boolean> {
    const result = await this.brandModel.insertMany([input]);
    return result.length > 0 ? true : false;
  }

  async login(input: I_BrandLogin): Promise<string> {
    try {
      const password = sha256(input.password).toString();

      const [find_user]: I_BrandLoginData[] = await this.brandModel.aggregate([
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
            id: { $toString: '$_id' },
            brand_name: '$detail.name',
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

  async findUserEmail(email: string, brand_id: ObjectId): Promise<string> {
    const [result] = await this.brandModel.aggregate([
      {
        $match: {
          _id: brand_id,
        },
      },
      {
        $addFields: {
          result_filter: {
            $ifNull: [filter_map('$userAccess', '$$this.email', email), 'none'],
          },
        },
      },
      {
        $project: {
          final: '$result_filter',
        },
      },
    ]);

    return result.final;
  }

  async newUserBrand(
    dataInput: I_UserAccess,
    brand_id: ObjectId,
  ): Promise<boolean> {
    const result = await this.brandModel.findOneAndUpdate(
      {
        _id: brand_id,
      },
      {
        $push: {
          userAccess: dataInput,
        },
      },
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async editUserBrand(
    dataInput: I_UserAccess,
    brand_id: ObjectId,
  ): Promise<boolean> {
    const result = await this.brandModel.findOneAndUpdate(
      {
        _id: brand_id,
        'userAccess.email': dataInput.email,
      },
      {
        $set: {
          'userAccess.$.email': dataInput.email,
          'userAccess.$.password': sha256(dataInput.password).toString(),
          'userAccess.$.username': dataInput.username,
          'userAccess.$.role': dataInput.roleLevel,
        },
      },
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async deleteUser(email: string, brand_id: ObjectId): Promise<boolean> {
    const result = await this.brandModel.findOneAndUpdate(
      {
        _id: brand_id,
      },
      {
        $pull: {
          userAccess: { email },
        },
      },
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async userBrand(
    brand_id: ObjectId,
    search: string,
  ): Promise<I_UserList[] | boolean> {
    const result = await this.brandModel.aggregate([
      {
        $match: { _id: brand_id },
      },
      {
        $project: {
          result: '$userAccess',
          _id: 0,
        },
      },
      {
        $unwind: { path: '$result' },
      },
      {
        $match: search_something('result.username', search),
      },
      {
        $project: {
          username: '$result.username',
          email: '$result.email',
          roleLevel: '$result.roleLevel',
        },
      },
    ]);

    if (result.length === 0) {
      return false;
    }

    return result;
  }
}
