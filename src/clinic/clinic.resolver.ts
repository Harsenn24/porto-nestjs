import { ClinicService } from './clinic.service';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { createClinicSuccess } from './model/create/gkl.output';
import { ClinicRegister } from './model/create/gkl.input';
import {
  I_ClinicAddress,
  I_ClinicDetail,
  I_ClinicLegalDocument,
  I_ClinicUserAccess,
  I_CreateClinic,
} from './interface/create';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/lib/authguard';
import { I_BrandLoginData } from 'src/auth/interface/brand.login';
import { ObjectId } from 'bson';
import { JwtService } from '@nestjs/jwt';
import { readListClinic } from './model/read_list/gkl.output';
import { deleteClinic } from './model/delete/gkl.output';
import { ClinicId } from './model/delete/gkl.input';
import { createClinicSuccessUpdate } from './model/update/gkl.output';
import { ClinicRegisterUpdate } from './model/update/gkl.input';
import {
  I_ClinicAddressUpdate,
  I_ClinicDetailUpdate,
  I_ClinicLegalDocumentUpdate,
  I_ClinicUserAccessUpdate,
  I_CreateClinicUpdate,
} from './interface/update';
import { ClinicLoginData } from './model/login/gql.ouput';
import { ClinicLogin } from './model/login/gql.input';
import { I_ClinicLogin } from './interface/login';

@Resolver()
export class ClinicResolver {
  constructor(
    private readonly clinicService: ClinicService,
    private jwtService: JwtService,
  ) {}

  @Query(() => String)
  async hello() {
    return 'hello world!!';
  }

  @UseGuards(AuthGuard)
  @Mutation(() => createClinicSuccess)
  async clinicCreate(
    @Args('input') data: ClinicRegister,
    @Context('user') user: I_BrandLoginData,
  ) {
    try {
      const coordinates = data.clinicAddress.location.coordinates;

      const newAddress: I_ClinicAddress = {
        ...data.clinicAddress,
        location: {
          type: 'Point',
          coordinates,
        },
      };

      const clinicDetail: I_ClinicDetail = {
        ...data.detail,
      };

      const legalDocument = data.legalDocument as I_ClinicLegalDocument[];

      const userAccess = data.userAccess as I_ClinicUserAccess[];

      const user_oid = new ObjectId(user.id);

      const register_data: I_CreateClinic = {
        _brand: user_oid,
        address: newAddress,
        detail: clinicDetail,
        legalDocument,
        userAccess,
      };

      const result = await this.clinicService.createClinic(register_data);

      return {
        success: result,
      };
    } catch {
      return {
        success: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => createClinicSuccessUpdate)
  async clinicUpdate(
    @Args('input') data: ClinicRegisterUpdate,
    @Args('id_clinic') id_clinic: string,
  ) {
    try {
      const coordinates = data.clinicAddress.location.coordinates;

      const newAddress: I_ClinicAddressUpdate = {
        ...data.clinicAddress,
        location: {
          type: 'Point',
          coordinates,
        },
      };

      const clinicDetail: I_ClinicDetailUpdate = {
        ...data.detail,
      };

      const legalDocument = data.legalDocument as I_ClinicLegalDocumentUpdate[];

      const userAccess = data.userAccess as I_ClinicUserAccessUpdate[];

      const clinic_oid = new ObjectId(id_clinic);

      const register_data: I_CreateClinicUpdate = {
        _brand: clinic_oid,
        address: newAddress,
        detail: clinicDetail,
        legalDocument,
        userAccess,
      };

      const result = await this.clinicService.updateClinic(
        register_data,
        clinic_oid,
      );

      return {
        success: result,
      };
    } catch {
      return {
        success: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => [readListClinic]) // tadi lu output sebagai objek
  async clinicSearch(@Context('user') dataToken: I_BrandLoginData) {
    try {
      const brand_id = new ObjectId(dataToken.id);
      const result = await this.clinicService.listClinic(brand_id);
      return result;
    } catch {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => deleteClinic) // tadi lu output sebagai objek
  async clinicDelete(@Args('input') data: ClinicId) {
    try {
      const clinic_id = new ObjectId(data.clinic_id);

      const result = await this.clinicService.deleteClinic(clinic_id);

      return {
        success: result,
      };
    } catch {
      return {
        success: false,
      };
    }
  }

  @Mutation(() => ClinicLoginData)
  async authLoginClinic(@Args('input') data: ClinicLogin) {
    try {
      const loginData: I_ClinicLogin = {
        password: data.password,
        username_email: data.username_email,
      };
      const result = await this.clinicService.login(loginData);
      return {
        success: true,
        token: result,
      };
    } catch {
      return {
        success: false,
        token: '',
      };
    }
  }
}
