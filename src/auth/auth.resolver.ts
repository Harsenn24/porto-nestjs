import { BrandService } from './auth.service';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { registerSuccess, userBrandList } from './model/register/gkl.output';
import { BrandRegister, BrandUserAccess } from './model/register/gkl.input';
import { I_BrandRegister, I_UserAccess } from './interface/brand.register';
import * as sha256 from 'crypto-js/sha256';
import { BrandLoginData } from './model/login/gkl.output';
import { I_BrandLogin, I_BrandLoginData } from './interface/brand.login';
import { BrandLogin } from './model/login/gkl.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/lib/authguard';
import { ObjectId } from 'bson';

@Resolver()
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(() => String)
  async hello() {
    return 'hello world!!';
  }

  @Mutation(() => registerSuccess)
  async authRegister(@Args('input') data: BrandRegister) {
    try {
      data.userAccess.forEach((elment: I_UserAccess) => {
        elment.password = sha256(elment.password).toString();
      });

      const registerData: I_BrandRegister = {
        detail: data.detail,
        finances: {
          balance: 0,
          income: 0,
          loan: 0,
          withdraw: 0,
        },
        legalDocument: data.legalDocument,
        userAccess: data.userAccess,
      };
      const result = await this.brandService.register(registerData);
      return {
        success: result,
      };
    } catch {
      return {
        success: false,
      };
    }
  }

  @Mutation(() => BrandLoginData)
  async authLogin(@Args('input') data: BrandLogin) {
    try {
      const loginData: I_BrandLogin = {
        password: data.password,
        username_email: data.username_email,
      };
      const result = await this.brandService.login(loginData);
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

  @UseGuards(AuthGuard)
  @Mutation(() => registerSuccess)
  async userCreate(
    @Args('input') data: BrandUserAccess,
    @Context('user') brand: I_BrandLoginData,
  ) {
    try {
      const email_user = data.email;
      const brand_id = new ObjectId(brand.id);

      const checkUser = await this.brandService.findUserEmail(
        email_user,
        brand_id,
      );

      if (checkUser === 'none') {
        const result = await this.brandService.newUserBrand(data, brand_id);

        return {
          success: result,
        };
      }
      return {
        success: false,
      };
    } catch {
      return {
        success: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => registerSuccess)
  async userUpdate(
    @Args('input') data: BrandUserAccess,
    @Context('user') brand: I_BrandLoginData,
  ) {
    try {
      const email_user = data.email;
      const brand_id = new ObjectId(brand.id);

      const checkUser = await this.brandService.findUserEmail(
        email_user,
        brand_id,
      );

      if (checkUser === 'none') {
        return {
          success: false,
        };
      }

      const result = await this.brandService.editUserBrand(data, brand_id);
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
  @Mutation(() => registerSuccess)
  async userDelete(
    @Args('input') email: string,
    @Context('user') brand: I_BrandLoginData,
  ) {
    try {
      const brand_id = new ObjectId(brand.id);

      const checkUser = await this.brandService.findUserEmail(email, brand_id);

      if (checkUser === 'none') {
        return {
          success: false,
        };
      }

      const result = await this.brandService.deleteUser(email, brand_id);
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
  @Query(() => [userBrandList])
  async userSearch(
    @Args('input') search: string,
    @Context('user') brand: I_BrandLoginData,
  ) {
    try {
      const brand_id = new ObjectId(brand.id);

      const result = await this.brandService.userBrand(brand_id, search);

      return result;
    } catch {
      return {
        success: false,
      };
    }
  }
}
