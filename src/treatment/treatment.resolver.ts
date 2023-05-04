import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { TreatmentService } from './treatment.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/lib/authguard';
import { UseGuards } from '@nestjs/common';
import { createTreatmentSuccess } from './model/create/gql.output';
import { TreatmentCreate } from './model/create/gql.input';
import { I_CreateTreatment } from './interface/create';
import { ObjectId } from 'bson';
import { deleteTreatment } from './model/delete/gql.output';
import { addCinicSuccess } from './model/add.clinic/gql.output';
import { I_ClinicLoginData } from 'src/clinic/interface/login';
import { I_BrandLoginData } from 'src/auth/interface/brand.login';
import { searchTreatment } from './model/search/gql.output';
import { detailTreatment } from './model/detail/gql.output';

@Resolver()
export class TreatmentResolver {
  constructor(
    private readonly treatmentService: TreatmentService,
    private jwtService: JwtService,
  ) {}

  @Query(() => String)
  async helloTreatment() {
    return 'hello treatment!!';
  }

  @UseGuards(AuthGuard)
  @Mutation(() => createTreatmentSuccess)
  async treatmentCreate(
    @Args('input') data: TreatmentCreate,
    @Context('user') jwt_brand: I_BrandLoginData,
  ) {
    try {
      const register_data: I_CreateTreatment = {
        _brand: new ObjectId(jwt_brand.id),
        detail: data.detail,
        price: data.price,
      };

      const result = await this.treatmentService.createTreatment(register_data);

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
  @Mutation(() => createTreatmentSuccess)
  async treatmentUpdate(
    @Args('input') data: TreatmentCreate,
    @Args('id_treatment') id_treatment: string,
    @Context('user') jwt_brand: I_BrandLoginData,
  ) {
    try {
      const register_data: I_CreateTreatment = {
        _brand: new ObjectId(jwt_brand.id),
        detail: data.detail,
        price: data.price,
      };

      const id_treat = new ObjectId(id_treatment);

      const result = await this.treatmentService.updateTreatment(
        register_data,
        id_treat,
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
  @Mutation(() => deleteTreatment) // tadi lu output sebagai objek
  async treatmentDelete(@Args('id_treatment') id_treatment: string) {
    try {
      const id_treat = new ObjectId(id_treatment);

      const result = await this.treatmentService.deleteTreatment(id_treat);

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
  @Mutation(() => addCinicSuccess) // tadi lu output sebagai objek
  async addClinicToTreatment(
    @Args('id_treatment') id_treatment: string,
    @Context('user') jwt_clinic: I_ClinicLoginData,
  ) {
    try {
      const id_treat = new ObjectId(id_treatment);

      const id_clinic = new ObjectId(jwt_clinic.id_clinic);

      const result = await this.treatmentService.addClinic(id_clinic, id_treat);

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
  @Query(() => [searchTreatment]) // tadi lu output sebagai objek
  async treatmentSearch(@Context('user') jwt_brand: I_BrandLoginData, @Args('search') search: string ) {
    try {
      const id_brand = new ObjectId(jwt_brand.id);

      const result = await this.treatmentService.searchTreatment(id_brand, search);

      return result;
    } catch (e) {
      return e;
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => detailTreatment) // tadi lu output sebagai objek
  async treatmentDetail( @Args('id') id: string ) {
    try {
      const id_treatment = new ObjectId(id);

      const result = await this.treatmentService.detailTreatment(id_treatment);

      return result;
    } catch (e) {
      return e;
    }
  }
}
