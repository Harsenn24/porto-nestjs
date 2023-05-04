import { Module } from '@nestjs/common';
import { TreatmentResolver } from './treatment.resolver';
import { TreatmentService } from './treatment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TreatmentSchema } from './model/treatment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Treatment', schema: TreatmentSchema }]),
  ],
  providers: [TreatmentResolver, TreatmentService],
})
export class TreatmentModule {}
