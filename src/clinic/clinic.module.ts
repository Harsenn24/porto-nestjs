import { Module } from '@nestjs/common';
import { ClinicResolver } from './clinic.resolver';
import { ClinicService } from './clinic.service';
import { ClinicSchema } from './model/clinic.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Clinic', schema: ClinicSchema }]),
  ],
  providers: [ClinicResolver, ClinicService],
})
export class ClinicModule {}
