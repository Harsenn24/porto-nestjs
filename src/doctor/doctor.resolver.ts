import { DoctorService } from './doctor.service';
import { JwtService } from '@nestjs/jwt';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/lib/authguard';
import { createDoctorSuccess } from './model/create/gkl.output';
import { DoctorRegister } from './model/create/gkl.input';
import { I_BrandLoginData } from 'src/auth/interface/brand.login';
import {
  I_CreateDoctor,
  I_DoctorDetail,
  I_DoctorDetailUniversity,
  I_DoctorLegalDocument,
  I_DoctorOnline,
  I_DoctorPractic,
} from './interface/create';
import { ObjectId } from 'bson';
import { deleteDoctor } from './model/delete/gkl.output';
import { DoctorId } from './model/delete/gkl.input';
import { readDoctorSuccess } from './model/read/gkl.output';
import { readDoctor } from './model/read/gkl.input';
import { readDoctorDetail } from './model/detail/gkl.input';
import { readDoctorDetailSuccess } from './model/detail/gkl.output';

@Resolver()
export class DoctorResolver {
  constructor(
    private readonly doctorService: DoctorService,
    private jwtService: JwtService,
  ) {}

  @Query(() => String)
  async helloDoctor() {
    return 'hello doctor!!';
  }

  @UseGuards(AuthGuard)
  @Mutation(() => createDoctorSuccess)
  async doctorCreate(
    @Args('input') data: DoctorRegister,
    @Context('user') brand: I_BrandLoginData,
  ) {
    try {
      const brand_id = new ObjectId(brand.id);

      data.detail.university.forEach((el: I_DoctorDetailUniversity) => {
        el.graduate = new Date(el.graduate);
      });

      const detailDoctor: I_DoctorDetail = data.detail;

      const legalDocument: I_DoctorLegalDocument[] = data.legalDocument;

      const onlineDoctor: I_DoctorOnline = {
        isAccepting: true,
        lastOnline: 0,
      };

      data.practic.forEach((elx: I_DoctorPractic) => {
        elx.time.forEach((ely) => {
          ely.start = new Date(ely.start);
          ely.end = new Date(ely.end);
        });
      });

      const doctorPratic: I_DoctorPractic[] = data.practic;

      const register_data: I_CreateDoctor = {
        _brand: brand_id,
        detail: detailDoctor,
        legalDocument,
        _clinic: '',
        online: onlineDoctor,
        practic: doctorPratic,
      };

      const result = await this.doctorService.createDoctor(register_data);

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
  @Mutation(() => createDoctorSuccess)
  async doctorUpdate(
    @Args('input') data: DoctorRegister,
    @Args('id_doctor') id_doctor: string,
    @Context('user') brand: I_BrandLoginData,
  ) {
    try {
      const id_docs = new ObjectId(id_doctor);

      const brand_id = new ObjectId(brand.id);

      data.detail.university.forEach((el: I_DoctorDetailUniversity) => {
        el.graduate = new Date(el.graduate);
      });

      const detailDoctor: I_DoctorDetail = data.detail;

      const legalDocument: I_DoctorLegalDocument[] = data.legalDocument;

      const onlineDoctor: I_DoctorOnline = {
        isAccepting: true,
        lastOnline: 0,
      };

      data.practic.forEach((elx: I_DoctorPractic) => {
        elx.time.forEach((ely) => {
          ely.start = new Date(ely.start);
          ely.end = new Date(ely.end);
        });
      });

      const doctorPratic: I_DoctorPractic[] = data.practic;

      const register_data: I_CreateDoctor = {
        _brand: brand_id,
        detail: detailDoctor,
        legalDocument,
        _clinic: '',
        online: onlineDoctor,
        practic: doctorPratic,
      };

      const result = await this.doctorService.updateDoctor(
        register_data,
        id_docs,
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
  @Mutation(() => deleteDoctor) // tadi lu output sebagai objek
  async doctorDelete(@Args('input') data: DoctorId) {
    try {
      const doctor_id = new ObjectId(data.doctor_id);

      const result = await this.doctorService.deleteDoctor(doctor_id);

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
  @Query(() => [readDoctorSuccess]) // tadi lu output sebagai objek
  async doctorSearch(
    @Context('user') dataToken: I_BrandLoginData,
    @Args('input') data: readDoctor,
  ) {
    try {
      const brand_id = new ObjectId(dataToken.id);
      const search_name = data.search;

      console.log(brand_id);
      const result = await this.doctorService.readDoctor(search_name, brand_id);
      return result;
    } catch {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => readDoctorDetailSuccess) // tadi lu output sebagai objek
  async doctorDetail(
    @Context('user') dataToken: I_BrandLoginData,
    @Args('input') data: readDoctorDetail,
  ) {
    try {
      const brand_id = new ObjectId(dataToken.id);
      const id_doctor = new ObjectId(data.id_doctor);

      const [result] = await this.doctorService.readDoctorDetail(
        id_doctor,
        brand_id,
      );
      return result;
    } catch {
      throw new NotFoundException();
    }
  }
}
