import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorResolver } from './doctor.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema } from './model/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),
  ],
  providers: [DoctorService, DoctorResolver],
})
export class DoctorModule {}
