import { Module } from '@nestjs/common';
import { BrandService } from './auth.service';
import { BrandResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from './model/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Brand', schema: BrandSchema }]),
  ],
  providers: [BrandService, BrandResolver],
})
export class AuthModule {}
